import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  if (typeof window === "undefined") {
    console.warn("[Supabase] Credentials missing. Database operations will fail.");
  }
} else if (!process.env.SUPABASE_SERVICE_ROLE_KEY && typeof window === "undefined") {
  console.warn("[Supabase] SUPABASE_SERVICE_ROLE_KEY is missing. Server-side auth provisioning may fail under RLS.");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
