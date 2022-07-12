/// <reference types="@sveltejs/kit" />

import type { User } from "@supabase/supabase-js"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		jwt?: any
	}
	// interface Platform {}
	interface Session {
		user: import('@supabase/supabase-js').User
		profile: {
			name: string
			ach: {
				id: string
				account_no: string
				routing_no: string
			}
		}
	}
	// interface Stuff {}
}
