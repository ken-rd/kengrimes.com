<script context="module">
	import { loadClient, restoredSession } from '$lib/supabase';

	/** @type {import('@sveltejs/kit').Load } */
	export async function load({ session }) {
		if (restoredSession) Object.assign(session, restoredSession);
		return {
			stuff: { supabase: loadClient(session) }
		};
	}
</script>

<script>
	import { session, page } from '$app/stores';
	import { bindSession } from '$lib/supabase';
	import Nav from '$lib/Nav.svelte';
	import 'virtual:windi.css';
	import 'virtual:windi-devtools';
	bindSession($page.stuff.supabase, session)
 </script>

<Nav />
<main>
	<slot />
</main>
