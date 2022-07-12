import { createClient } from "@supabase/supabase-js";

/** @type {import("@supabase/supabase-js").SupabaseClientOptions} */
const opts = {}

export default createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    opts
)