/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		jwt?: {
			access_token: string
			expires_at: number
			expires_in: number
			refresh_token: string
			token_type: string
			user: {
				email: string
			}
		}
	}
	// interface Platform {}
	interface Session {
		email?: string
	}
	// interface Stuff {}
}
