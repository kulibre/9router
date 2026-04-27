import { EventEmitter } from "events";
import { supabase } from "@/lib/supabase.js";

// Singleton emitter
if (!global._statsEmitter) {
  global._statsEmitter = new EventEmitter();
  global._statsEmitter.setMaxListeners(50);
}
export const statsEmitter = global._statsEmitter;

// Pending requests state (kept in-memory)
if (!global._pendingRequests) {
  global._pendingRequests = { byModel: {}, byAccount: {} };
}
const pendingRequests = global._pendingRequests;

// Track last error provider for UI edge coloring
if (!global._lastErrorProvider) {
  global._lastErrorProvider = { provider: "", ts: 0 };
}
const lastErrorProvider = global._lastErrorProvider;

const PENDING_TIMEOUT_MS = 60 * 1000;
if (!global._pendingTimers) global._pendingTimers = {};
const pendingTimers = global._pendingTimers;

/**
 * Track a pending request
 */
export function trackPendingRequest(model, provider, connectionId, started, error = false) {
  const modelKey = provider ? `${model} (${provider})` : model;
  const timerKey = `${connectionId}|${modelKey}`;

  if (!pendingRequests.byModel[modelKey]) pendingRequests.byModel[modelKey] = 0;
  pendingRequests.byModel[modelKey] = Math.max(0, pendingRequests.byModel[modelKey] + (started ? 1 : -1));

  if (connectionId) {
    if (!pendingRequests.byAccount[connectionId]) pendingRequests.byAccount[connectionId] = {};
    if (!pendingRequests.byAccount[connectionId][modelKey]) pendingRequests.byAccount[connectionId][modelKey] = 0;
    pendingRequests.byAccount[connectionId][modelKey] = Math.max(0, pendingRequests.byAccount[connectionId][modelKey] + (started ? 1 : -1));
  }

  if (started) {
    clearTimeout(pendingTimers[timerKey]);
    pendingTimers[timerKey] = setTimeout(() => {
      delete pendingTimers[timerKey];
      if (pendingRequests.byModel[modelKey] > 0) pendingRequests.byModel[modelKey] = 0;
      if (connectionId && pendingRequests.byAccount[connectionId]?.[modelKey] > 0) {
        pendingRequests.byAccount[connectionId][modelKey] = 0;
      }
      statsEmitter.emit("pending");
    }, PENDING_TIMEOUT_MS);
  } else {
    clearTimeout(pendingTimers[timerKey]);
    delete pendingTimers[timerKey];
  }

  if (!started && error && provider) {
    lastErrorProvider.provider = provider.toLowerCase();
    lastErrorProvider.ts = Date.now();
  }

  statsEmitter.emit("pending");
}

/**
 * Save request usage
 */
export async function saveRequestUsage(entry) {
  try {
    const { data, error } = await supabase
      .from("usage_history")
      .insert({
        provider: entry.provider,
        model: entry.model,
        tokens: entry.tokens || {},
        timestamp: entry.timestamp || new Date().toISOString(),
        connection_id: entry.connectionId,
        api_key: entry.apiKey,
        cost: entry.cost || 0,
        status: entry.status || "ok"
      });

    if (error) throw error;
    statsEmitter.emit("update");
  } catch (error) {
    console.error("[usageDb] Failed to save usage:", error);
  }
}

/**
 * Get usage history
 */
export async function getUsageHistory(filter = {}) {
  let query = supabase.from("usage_history").select("*");

  if (filter.provider) query = query.eq("provider", filter.provider);
  if (filter.model) query = query.eq("model", filter.model);
  if (filter.startDate) query = query.gte("timestamp", filter.startDate);
  if (filter.endDate) query = query.lte("timestamp", filter.endDate);

  const { data, error } = await query.order("timestamp", { ascending: false }).limit(filter.limit || 1000);
  if (error) throw error;

  return data.map(h => ({
    ...h,
    connectionId: h.connection_id,
    apiKey: h.api_key
  }));
}

/**
 * Get aggregated usage stats
 */
export async function getUsageStats(period = "all") {
  // In a real implementation, we'd use the usage_aggregates view and filter by period.
  // For now, we'll fetch from history or aggregates.
  const [{ data: recentLogs }, { data: aggregates }] = await Promise.all([
    supabase
      .from("usage_history")
      .select("*")
      .order("timestamp", { ascending: false })
      .limit(20),
    supabase
      .from("usage_aggregates")
      .select("*")
  ]);

  // Construct stats object expected by UI
  const stats = {
    totalRequests: 0,
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    totalCost: 0,
    byProvider: {},
    byModel: {},
    pending: pendingRequests,
    recentRequests: (recentLogs || []).map(l => ({
      timestamp: l.timestamp,
      model: l.model,
      provider: l.provider,
      promptTokens: l.tokens?.prompt_tokens || 0,
      completionTokens: l.tokens?.completion_tokens || 0,
      status: l.status || "ok"
    })),
    errorProvider: (Date.now() - lastErrorProvider.ts < 10000) ? lastErrorProvider.provider : ""
  };

  if (aggregates) {
    aggregates.forEach(agg => {
      stats.totalRequests += parseInt(agg.total_requests);
      stats.totalPromptTokens += parseFloat(agg.total_prompt_tokens || 0);
      stats.totalCompletionTokens += parseFloat(agg.total_completion_tokens || 0);
      stats.totalCost += parseFloat(agg.total_cost || 0);

      if (!stats.byProvider[agg.provider]) stats.byProvider[agg.provider] = { requests: 0, cost: 0 };
      stats.byProvider[agg.provider].requests += parseInt(agg.total_requests);
      stats.byProvider[agg.provider].cost += parseFloat(agg.total_cost || 0);
    });
  }

  return stats;
}

// Compatibility exports
export { saveRequestDetail } from "./requestDetailsDb.js";
export async function getUsageDb() { return { data: { history: [] }, read: async () => {}, write: async () => {} }; }
export async function appendRequestLog() {} // Could be implemented with supabase
export async function getRecentLogs() { return []; }
