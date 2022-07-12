<script>
	import { session } from '$app/stores';
	import Profile from '$lib/Profile.svelte';
	import Auth from '$lib/Auth.svelte'

	console.log($session.user)
</script>

<h1>Robingood</h1>
{#if $session.user}
	<Profile />
{:else}
	<Auth />
{/if}
<hr />