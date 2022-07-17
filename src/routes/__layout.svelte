<script context="module">
	import { loadClient, restoredSession } from '$lib/supabase';

	/** @type {import('@sveltejs/kit').Load } */
	export async function load({ session }) {
		if (restoredSession) Object.assign(session,restoredSession)
		return {
			stuff: { ...loadClient(session) }
		};
	}
</script>

<script>
	import { session, page } from '$app/stores';
	import Nav from '$lib/Nav.svelte';
	import 'virtual:windi.css';
	import 'virtual:windi-devtools';

	$page.stuff.onSessionUpdate(session.set)
</script>

<nav>
	<Nav />
</nav>

<main>
	<slot />
</main>
