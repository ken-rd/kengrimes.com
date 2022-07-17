<script>
	import { session } from '$app/stores';
	import Profile from '$lib/Profile.svelte';
	import Auth from '$lib/Auth.svelte'
</script>

<h1>Robingood</h1>
{#if $session.user?.email}
	<Profile />
{:else}
	<Auth />
{/if}
<hr />