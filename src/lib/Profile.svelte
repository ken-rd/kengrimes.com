<script>
	import { session } from '$app/stores';
	import supabase from './supabase';

	const signOut = () => supabase.auth.signOut();
</script>

{#if $session.user}
	{$session.user.email}
	<button on:click={signOut}>Sign Out</button>
{/if}
