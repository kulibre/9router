import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase.js";

const DEFAULT_MITM_ROUTER_BASE = "http://localhost:20128";

const DEFAULT_SETTINGS = {
  cloudEnabled: false,
  tunnelEnabled: false,
  tunnelUrl: "",
  tunnelProvider: "cloudflare",
  tailscaleEnabled: false,
  tailscaleUrl: "",
  stickyRoundRobinLimit: 3,
  providerStrategies: {},
  comboStrategy: "fallback",
  comboStrategies: {},
  requireLogin: true,
  tunnelDashboardAccess: true,
  observabilityEnabled: true,
  observabilityMaxRecords: 1000,
  observabilityBatchSize: 20,
  observabilityFlushIntervalMs: 5000,
  observabilityMaxJsonSize: 1024,
  outboundProxyEnabled: false,
  outboundProxyUrl: "",
  outboundNoProxy: "",
  mitmRouterBaseUrl: DEFAULT_MITM_ROUTER_BASE,
  rtkEnabled: false,
};

// --- Helpers ---
function mapToSnakeCase(obj) {
  if (!obj) return {};
  const next = {};
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
    next[snakeKey] = value;
  }
  return next;
}

function mapToCamelCase(obj) {
  if (!obj) return {};
  const next = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    next[camelKey] = value;
  }
  return next;
}

const CONNECTION_COLUMNS = [
  "id", "user_id", "provider", "auth_type", "name", "priority", "is_active",
  "display_name", "email", "access_token", "refresh_token",
  "expires_at", "api_key", "id_token", "scope", "token_type", "test_status",
  "created_at", "updated_at"
];

function prepareConnectionForDb(data) {
  const snakeData = mapToSnakeCase(data);
  const result = {};
  const providerSpecificData = { ...(data.providerSpecificData || {}) };

  for (const [key, value] of Object.entries(snakeData)) {
    if (CONNECTION_COLUMNS.includes(key)) {
      result[key] = value;
    } else if (key !== "provider_specific_data") {
      // Put unknown/extra fields into providerSpecificData
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      providerSpecificData[camelKey] = data[camelKey];
    }
  }
  
  result.provider_specific_data = providerSpecificData;
  return result;
}

function mapConnectionFromDb(obj) {
  if (!obj) return null;
  const { provider_specific_data, ...rest } = obj;
  const camelBase = mapToCamelCase(rest);
  return {
    ...camelBase,
    ...provider_specific_data,
    providerSpecificData: provider_specific_data // Keep for compatibility
  };
}

// --- Cache Logic ---
let cache = {
  connectionsByUser: new Map(),
  settings: { data: null, ts: 0 }
};
const CACHE_TTL = 2000; // 2 seconds

// --- Provider Connections ---
export async function getProviderConnections(userId, filter = {}) {
  const now = Date.now();
  const useCache = !!userId && !filter.provider && filter.isActive === undefined;
  const cached = useCache ? cache.connectionsByUser.get(userId) : null;

  if (cached && (now - cached.ts) < CACHE_TTL) {
    return cached.data;
  }

  let query = supabase.from("provider_connections").select("*");

  if (userId) query = query.eq("user_id", userId);
  if (filter.provider) query = query.eq("provider", filter.provider);
  if (filter.isActive !== undefined) query = query.eq("is_active", filter.isActive);

  const { data, error } = await query.order("priority", { ascending: true });
  if (error) throw error;

  const result = data.map(mapConnectionFromDb);
  if (useCache) {
    cache.connectionsByUser.set(userId, { data: result, ts: now });
  }
  return result;
}

export async function getProviderConnectionById(userId, id) {
  let query = supabase.from("provider_connections").select("*").eq("id", id);
  if (userId) query = query.eq("user_id", userId);
  const { data, error } = await query.single();
  if (error) return null;
  return mapConnectionFromDb(data);
}

export async function createProviderConnection(userId, data) {
  const id = data.id || uuidv4();
  const dbData = prepareConnectionForDb({ ...data, id, userId });
  dbData.user_id = userId;

  const { data: inserted, error } = await supabase
    .from("provider_connections")
    .upsert(dbData, { onConflict: "id" })
    .select()
    .single();

  if (error) {
    console.error("[localDb] createProviderConnection error:", error);
    throw error;
  }

  if (userId) cache.connectionsByUser.delete(userId);

  return mapConnectionFromDb(inserted);
}

export async function updateProviderConnection(userId, id, data) {
  const dbData = prepareConnectionForDb(data);
  let query = supabase
    .from("provider_connections")
    .update(dbData)
    .eq("id", id);
  if (userId) query = query.eq("user_id", userId);
  const { data: updated, error } = await query
    .select()
    .single();

  if (error) {
    console.error("[localDb] updateProviderConnection error:", error);
    throw error;
  }

  if (userId) cache.connectionsByUser.delete(userId);

  return mapConnectionFromDb(updated);
}

export async function deleteProviderConnection(userId, id) {
  let query = supabase.from("provider_connections").delete().eq("id", id);
  if (userId) query = query.eq("user_id", userId);
  const { error } = await query;
  if (userId) cache.connectionsByUser.delete(userId);
  return !error;
}

export async function deleteProviderConnectionsByProvider(userId, provider) {
  let query = supabase.from("provider_connections").delete().eq("provider", provider);
  if (userId) query = query.eq("user_id", userId);
  const { error } = await query;
  if (userId) cache.connectionsByUser.delete(userId);
  return !error;
}

// --- Provider Nodes ---
export async function getProviderNodes(filter = {}) {
  let query = supabase.from("provider_nodes").select("*");
  if (filter.type) query = query.eq("type", filter.type);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(mapToCamelCase);
}

export async function createProviderNode(data) {
  const snakeData = mapToSnakeCase({ ...data, id: data.id || uuidv4() });
  const { data: inserted, error } = await supabase.from("provider_nodes").insert(snakeData).select().single();
  if (error) throw error;
  return mapToCamelCase(inserted);
}

export async function updateProviderNode(id, data) {
  const snakeData = mapToSnakeCase(data);
  const { data: updated, error } = await supabase.from("provider_nodes").update(snakeData).eq("id", id).select().single();
  if (error) throw error;
  return mapToCamelCase(updated);
}

export async function getProviderNodeById(id) {
  const { data, error } = await supabase.from("provider_nodes").select("*").eq("id", id).single();
  if (error) return null;
  return mapToCamelCase(data);
}

export async function deleteProviderNode(id) {
  const { error } = await supabase.from("provider_nodes").delete().eq("id", id);
  return !error;
}

// --- Proxy Pools ---
export async function getProxyPools(filter = {}) {
  let query = supabase.from("proxy_pools").select("*");
  if (filter.isActive !== undefined) query = query.eq("is_active", filter.isActive);
  const { data, error } = await query.order("updated_at", { ascending: false });
  if (error) throw error;
  return data.map(mapToCamelCase);
}

export async function createProxyPool(data) {
  const snakeData = mapToSnakeCase({ ...data, id: data.id || uuidv4() });
  const { data: inserted, error } = await supabase.from("proxy_pools").insert(snakeData).select().single();
  if (error) throw error;
  return mapToCamelCase(inserted);
}

export async function updateProxyPool(id, data) {
  const snakeData = mapToSnakeCase(data);
  const { data: updated, error } = await supabase.from("proxy_pools").update(snakeData).eq("id", id).select().single();
  if (error) throw error;
  return mapToCamelCase(updated);
}

export async function getProxyPoolById(id) {
  const { data, error } = await supabase.from("proxy_pools").select("*").eq("id", id).single();
  if (error) return null;
  return mapToCamelCase(data);
}

export async function deleteProxyPool(id) {
  const { error } = await supabase.from("proxy_pools").delete().eq("id", id);
  return !error;
}

// --- Settings ---
export async function getSettings() {
  const now = Date.now();
  if (cache.settings.data && (now - cache.settings.ts) < CACHE_TTL) {
    return cache.settings.data;
  }

  const { data, error } = await supabase.from("settings").select("*").eq("id", 1).single();
  if (error) {
    console.error("[localDb] Failed to fetch settings:", error);
    return DEFAULT_SETTINGS;
  }
  
  const result = mapToCamelCase(data);
  cache.settings.data = result;
  cache.settings.ts = now;
  return result;
}

export async function updateSettings(updates) {
  const snakeUpdates = mapToSnakeCase(updates);
  const { data, error } = await supabase
    .from("settings")
    .update(snakeUpdates)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw error;

  const result = mapToCamelCase(data);
  // Clear cache
  cache.settings.data = result;
  cache.settings.ts = Date.now();
  
  return result;
}

// --- API Keys ---
export async function getApiKeys() {
  const { data, error } = await supabase.from("api_keys").select("*");
  if (error) throw error;
  return data.map(mapToCamelCase);
}

export async function createApiKey(name, machineId) {
  const { generateApiKeyWithMachine } = await import("@/shared/utils/apiKey");
  const result = generateApiKeyWithMachine(machineId);

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      id: uuidv4(),
      name: name,
      key: result.key,
      machine_id: machineId,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw error;
  return mapToCamelCase(data);
}

export async function deleteApiKey(id) {
  const { error } = await supabase.from("api_keys").delete().eq("id", id);
  return !error;
}

export async function validateApiKey(key) {
  const { data, error } = await supabase
    .from("api_keys")
    .select("is_active")
    .eq("key", key)
    .single();
  
  if (error || !data) return false;
  return data.is_active !== false;
}

// --- Combos ---
export async function getCombos() {
  const { data, error } = await supabase.from("combos").select("*");
  if (error) throw error;
  return data.map(mapToCamelCase);
}

export async function createCombo(data) {
  const { data: inserted, error } = await supabase
    .from("combos")
    .insert({
      id: uuidv4(),
      name: data.name,
      models: data.models || [],
    })
    .select()
    .single();
  if (error) throw error;
  return mapToCamelCase(inserted);
}

export async function getComboById(id) {
  const { data, error } = await supabase.from("combos").select("*").eq("id", id).single();
  if (error) return null;
  return mapToCamelCase(data);
}

export async function getComboByName(name) {
  const { data, error } = await supabase.from("combos").select("*").eq("name", name).single();
  if (error) return null;
  return mapToCamelCase(data);
}

export async function updateCombo(id, data) {
  const { data: updated, error } = await supabase
    .from("combos")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapToCamelCase(updated);
}

export async function deleteCombo(id) {
  const { error } = await supabase.from("combos").delete().eq("id", id);
  return !error;
}

// --- Model Aliases ---
export async function getModelAliases() {
  const { data, error } = await supabase.from("model_aliases").select("*");
  if (error) throw error;
  const result = {};
  data.forEach(a => result[a.alias] = a.model);
  return result;
}

export async function setModelAlias(alias, model) {
  const { error } = await supabase
    .from("model_aliases")
    .upsert({ alias, model }, { onConflict: "alias" });
  if (error) throw error;
  return true;
}

export async function deleteModelAlias(alias) {
  const { error } = await supabase.from("model_aliases").delete().eq("alias", alias);
  return !error;
}

// --- Custom Models ---
export async function getCustomModels() {
  const { data, error } = await supabase.from("custom_models").select("*");
  if (error) throw error;
  return data.map(m => ({
    providerAlias: m.provider_alias,
    id: m.model_id,
    type: m.type,
    name: m.name
  }));
}

export async function addCustomModel({ providerAlias, id, type, name }) {
  const { data, error } = await supabase
    .from("custom_models")
    .upsert({
      provider_alias: providerAlias,
      model_id: id,
      type: type || "llm",
      name
    }, { onConflict: "provider_alias, model_id, type" })
    .select()
    .single();
  
  if (error) throw error;
  return {
    providerAlias: data.provider_alias,
    id: data.model_id,
    type: data.type,
    name: data.name
  };
}

export async function deleteCustomModel({ providerAlias, id, type }) {
  const { error } = await supabase
    .from("custom_models")
    .delete()
    .eq("provider_alias", providerAlias)
    .eq("model_id", id)
    .eq("type", type || "llm");
  
  return !error;
}

// --- MITM Aliases ---
export async function getMitmAlias(tool) {
  let query = supabase.from("mitm_aliases").select("*");
  if (tool) query = query.eq("tool", tool);
  const { data, error } = await query;
  if (error) throw error;
  
  const result = {};
  data.forEach(a => {
    if (!result[a.tool]) result[a.tool] = {};
    result[a.tool][a.alias] = a.model;
  });
  
  return tool ? (result[tool] || {}) : result;
}

export async function setMitmAliasAll(tool, mappings) {
  // First delete existing for this tool
  await supabase.from("mitm_aliases").delete().eq("tool", tool);
  
  const records = Object.entries(mappings).map(([alias, model]) => ({
    tool,
    alias,
    model
  }));
  
  if (records.length > 0) {
    const { error } = await supabase.from("mitm_aliases").insert(records);
    if (error) throw error;
  }
  
  return true;
}

// --- Compatibility Exports (Dummy or legacy) ---
export async function getDb() { return { data: {} }; }
export async function safeRead() {}
export async function safeWrite() {}
export async function exportDb() {
  const [connections, nodes, proxies, settings, apiKeys, combos] = await Promise.all([
    getProviderConnections(null),
    getProviderNodes(),
    getProxyPools(),
    getSettings(),
    getApiKeys(),
    getCombos()
  ]);
  return {
    providerConnections: connections,
    providerNodes: nodes,
    proxyPools: proxies,
    settings,
    apiKeys,
    combos
  };
}

export async function importDb(payload) {
  const {
    providerConnections,
    providerNodes,
    proxyPools,
    settings,
    apiKeys,
    combos
  } = payload;

  const tasks = [];

  if (providerConnections && Array.isArray(providerConnections)) {
    tasks.push(supabase.from("provider_connections").upsert(providerConnections.map(prepareConnectionForDb)));
  }
  if (providerNodes && Array.isArray(providerNodes)) {
    tasks.push(supabase.from("provider_nodes").upsert(providerNodes.map(mapToSnakeCase)));
  }
  if (proxyPools && Array.isArray(proxyPools)) {
    tasks.push(supabase.from("proxy_pools").upsert(proxyPools.map(mapToSnakeCase)));
  }
  if (settings) {
    tasks.push(supabase.from("settings").upsert(mapToSnakeCase(settings)));
  }
  if (apiKeys && Array.isArray(apiKeys)) {
    tasks.push(supabase.from("api_keys").upsert(apiKeys.map(mapToSnakeCase)));
  }
  if (combos && Array.isArray(combos)) {
    tasks.push(supabase.from("combos").upsert(combos.map(mapToSnakeCase)));
  }

  const results = await Promise.all(tasks);
  const errors = results.filter(r => r.error).map(r => r.error);
  if (errors.length > 0) {
    console.error("[localDb] importDb errors:", errors);
    throw new Error(`Import partially failed: ${errors[0].message}`);
  }
  
  // Clear cache
  cache.connections.data = null;
  cache.settings.data = null;
  
  return true;
}

export async function getPricing() {
  const { PROVIDER_PRICING } = await import("@/shared/constants/pricing.js");
  return PROVIDER_PRICING; // For now, return default pricing
}

export async function getPricingForModel(provider, model) {
  const pricing = await getPricing();
  return pricing[provider]?.[model] || null;
}

export async function isCloudEnabled() {
  const settings = await getSettings();
  return settings.cloudEnabled === true;
}

export async function cleanupProviderConnections() {
  try {
    // Reset test_status for connections and pools on startup
    await Promise.all([
      supabase.from("provider_connections").update({ test_status: null }).neq("id", "0"),
      supabase.from("proxy_pools").update({ test_status: "unknown" }).neq("id", "0")
    ]);
    console.log("[localDb] Cleanup complete");
  } catch (err) {
    console.error("[localDb] Cleanup failed:", err);
  }
}

// --- Keys compatibility ---
export async function getApiKeyById(id) {
  const { data, error } = await supabase.from("api_keys").select("*").eq("id", id).single();
  if (error) return null;
  return mapToCamelCase(data);
}

export async function updateApiKey(id, data) {
  const snakeData = mapToSnakeCase(data);
  const { data: updated, error } = await supabase.from("api_keys").update(snakeData).eq("id", id).select().single();
  if (error) throw error;
  return mapToCamelCase(updated);
}

// --- Pricing compatibility ---

export async function updatePricing(pricingData) {
  const rows = [];
  for (const [provider, models] of Object.entries(pricingData)) {
    for (const [model, pricing] of Object.entries(models)) {
      rows.push({
        provider,
        model,
        input: pricing.input || 0,
        output: pricing.output || 0,
        cached: pricing.cached || 0
      });
    }
  }
  if (rows.length > 0) {
    await supabase.from("pricing").upsert(rows);
  }
  return getPricing();
}

export async function resetPricing(provider, model) {
  let query = supabase.from("pricing").delete();
  if (provider) query = query.eq("provider", provider);
  if (model) query = query.eq("model", model);
  await query;
  return true;
}

export async function resetAllPricing() {
  await supabase.from("pricing").delete().neq("provider", "");
  return true;
}
