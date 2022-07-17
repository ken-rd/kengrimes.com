<script>
	import { session, page } from '$app/stores';
	let email = '';
	let validEmail = true;
	let loading = false;

	const signIn = async () => {
		if ($page.stuff.supabase) {
			loading = true;
			const response = await $page.stuff.supabase.auth.signIn({ email });
			alert('Check your email for a login link!');
			loading = false;
		}
	};
</script>

<form on:submit|preventDefault={signIn}>
	<input type="email" required placeholder="Email" bind:value={email} />
	<input disabled={loading} type="submit" value="Sign In" />
</form> 
