/// <reference types="@sveltejs/kit" />
/// <reference types="@supabase/supabase-js" />
type SBSession = import('@supabase/supabase-js').Session;

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		session?: import('@supabase/supabase-js').Session;
	}
	// interface Platform {}

	interface Session extends SBSession {}

	interface Stuff {
		supabase: import('@supabase/supabase-js').SupabaseClient;
	}
}
