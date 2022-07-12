<script>
	import 'virtual:windi.css';
	import 'virtual:windi-devtools';
	import Nav from '$lib/Nav.svelte';
    import supabase from '$lib/supabase';
    import { session } from '$app/stores';

    session.subscribe((v) => {
		console.log('session updated', v);
	});

	supabase.auth.onAuthStateChange((event, authSession) => {
		session.set({ user: authSession?.user })
        console.log("auth state changed", event, authSession)
	});
</script>

<nav>
	<Nav />
</nav>

<main>
	<slot />
</main>
