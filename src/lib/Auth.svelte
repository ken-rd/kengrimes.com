<script>
	import supabase from './supabase';
	import { session } from '$app/stores';
	let email = '';
	let validEmail = true;
	let loading = false;

	supabase.auth.onAuthStateChange((_, authSession) => {
		session.set({ email: authSession?.user?.email });
	});

	const signIn = async () => {
		loading = true;
        const response = await supabase.auth.signIn({email})

        alert('Check your email for a login link!')
        if (response.user) session.set({ user: response.user })

        loading = false;
	};
</script>

<form on:submit|preventDefault={signIn}>
	<input
		type="email"
		required
		placeholder="Email"
		bind:value={email}
	/>
	<button disabled={loading} type="submit">Sign In</button>
</form>
