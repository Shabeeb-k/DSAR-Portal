// TypeScript declaration for supabaseClient module
// This allows TypeScript to resolve imports for supabaseClient

declare module "utils/supabaseClient" {
  import { SupabaseClient } from "@supabase/supabase-js";
  export const supabase: SupabaseClient;
}
