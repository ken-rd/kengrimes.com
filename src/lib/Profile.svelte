<script>
	import { session, page } from '$app/stores';
	const signOut = () => $page.stuff.supabase?.auth.signOut();
</script>

{#if $session.user?.email}
	{$session.user.email}
	<button on:click={signOut}>Sign Out</button>
{/if}
