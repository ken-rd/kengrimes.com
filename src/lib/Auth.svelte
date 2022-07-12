<script>
	import supabase from './supabase';
	import { session } from '$app/stores';
	let email = '';
	let validEmail = true;
	let loading = false;

	const login = async () => {
		loading = true;
		supabase.auth
			.signIn({ email })
			.then(({ session, error }) => {
				error ? alert(error.message) : alert('Check your email for a login link!');
			})
			.catch(console.error)
			.finally(() => (loading = false));
	};
</script>

<h1>Auth</h1>
<form on:submit|preventDefault={login}>
	<input
		type="email"
		required
		placeholder="Email"
		bind:value={email}
	/>
	<button disabled={loading} type="submit">Log In</button>
</form>
