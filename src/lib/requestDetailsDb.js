import { supabase } from "@/lib/supabase.js";

const DEFAULT_MAX_RECORDS = 1000;
const DEFAULT_BATCH_SIZE = 20;
const DEFAULT_FLUSH_INTERVAL_MS = 5000;
const DEFAULT_MAX_JSON_SIZE = 10 * 1024; // 10KB
const CONFIG_CACHE_TTL_MS = 5000;

// Config cache
let cachedConfig = null;
let cachedConfigTs = 0;

async function getObservabilityConfig() {
  if (cachedConfig && (Date.now() - cachedConfigTs) < CONFIG_CACHE_TTL_MS) {
    return cachedConfig;
  }

  try {
    const { getSettings } = await import("@/lib/localDb");
    const settings = await getSettings();
    
    cachedConfig = {
      enabled: settings.observabilityEnabled ?? true,
      maxRecords: settings.observabilityMaxRecords || DEFAULT_MAX_RECORDS,
      batchSize: settings.observabilityBatchSize || DEFAULT_BATCH_SIZE,
      flushIntervalMs: settings.observabilityFlushIntervalMs || DEFAULT_FLUSH_INTERVAL_MS,
      maxJsonSize: (settings.observabilityMaxJsonSize || 10) * 1024,
    };
  } catch {
    cachedConfig = {
      enabled: true,
      maxRecords: DEFAULT_MAX_RECORDS,
      batchSize: DEFAULT_BATCH_SIZE,
      flushIntervalMs: DEFAULT_FLUSH_INTERVAL_MS,
      maxJsonSize: DEFAULT_MAX_JSON_SIZE,
    };
  }

  cachedConfigTs = Date.now();
  return cachedConfig;
}

// Batch write queue
let writeBuffer = [];
let flushTimer = null;
let isFlushing = false;

function sanitizeHeaders(headers) {
  if (!headers || typeof headers !== "object") return {};
  const sensitiveKeys = ["authorization", "x-api-key", "cookie", "token", "api-key"];
  const sanitized = { ...headers };
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      delete sanitized[key];
    }
  }
  return sanitized;
}

async function flushToDatabase() {
  if (isFlushing || writeBuffer.length === 0) return;

  isFlushing = true;
  try {
    const itemsToSave = [...writeBuffer];
    writeBuffer = [];

    const config = await getObservabilityConfig();

    const records = itemsToSave.map(item => {
      const record = {
        id: item.id || crypto.randomUUID(),
        provider: item.provider || null,
        model: item.model || null,
        connection_id: item.connectionId || null,
        timestamp: item.timestamp || new Date().toISOString(),
        status: item.status || null,
        latency: item.latency || {},
        tokens: item.tokens || {},
        request: item.request || {},
        provider_request: item.providerRequest || {},
        provider_response: item.providerResponse || {},
        response: item.response || {},
      };

      if (record.request?.headers) record.request.headers = sanitizeHeaders(record.request.headers);

      // Truncate oversized JSON fields
      const maxSize = config.maxJsonSize;
      for (const field of ["request", "provider_request", "provider_response", "response"]) {
        const str = JSON.stringify(record[field]);
        if (str.length > maxSize) {
          record[field] = { _truncated: true, _originalSize: str.length, _preview: str.substring(0, 200) };
        }
      }
      return record;
    });

    const { error } = await supabase.from("request_details").upsert(records);
    if (error) throw error;

  } catch (error) {
    console.error("[requestDetailsDb] Batch write failed:", error);
  } finally {
    isFlushing = false;
  }
}

export async function saveRequestDetail(detail) {
  const config = await getObservabilityConfig();
  if (!config.enabled) return;

  writeBuffer.push(detail);

  if (writeBuffer.length >= config.batchSize) {
    await flushToDatabase();
    if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
  } else if (!flushTimer) {
    flushTimer = setTimeout(() => {
      flushToDatabase().catch(() => {});
      flushTimer = null;
    }, config.flushIntervalMs);
  }
}

export async function getRequestDetails(filter = {}) {
  let query = supabase.from("request_details").select("*", { count: "exact" });

  if (filter.provider) query = query.eq("provider", filter.provider);
  if (filter.model) query = query.eq("model", filter.model);
  if (filter.connectionId) query = query.eq("connection_id", filter.connectionId);
  if (filter.status) query = query.eq("status", filter.status);
  if (filter.startDate) query = query.gte("timestamp", filter.startDate);
  if (filter.endDate) query = query.lte("timestamp", filter.endDate);

  const page = filter.page || 1;
  const pageSize = filter.pageSize || 50;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await query
    .order("timestamp", { ascending: false })
    .range(from, to);

  if (error) throw error;

  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    details: data.map(r => ({ ...r, connectionId: r.connection_id, providerRequest: r.provider_request, providerResponse: r.provider_response })),
    pagination: { page, pageSize, totalItems, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
  };
}

export async function getRequestDetailById(id) {
  const { data, error } = await supabase.from("request_details").select("*").eq("id", id).single();
  if (error) return null;
  return { ...data, connectionId: data.connection_id, providerRequest: data.provider_request, providerResponse: data.provider_response };
}

// Graceful shutdown
const _shutdownHandler = async () => {
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
  if (writeBuffer.length > 0) await flushToDatabase();
};

if (typeof process !== "undefined") {
  process.on("SIGINT", _shutdownHandler);
  process.on("SIGTERM", _shutdownHandler);
}
