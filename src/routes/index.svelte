<script>
	import { session } from '$app/stores';
	import supabase from '$lib/supabase';
	import Auth from '$lib/Auth.svelte';

	session.subscribe((v) => {
		console.log('session fired', v);
	});

	const authSession = supabase.auth.session();
	if (authSession) session.set({
        email: authSession.user?.email
    });

	supabase.auth.onAuthStateChange((_, authSession) => {
		session.set({ email: authSession?.user?.email});
	});
</script>

<h1>Robbin for the good of humanity</h1>
{#if $session}
	{$session.email}
{:else}
	<Auth />
{/if}
<hr />
