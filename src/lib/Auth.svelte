<script>
	import { session, page } from '$app/stores';
	import { validate } from 'email-validator';

	let email = $session.user?.email || '';
	let placeholder = 'Email';
	$: validEmail = validate(email);

	const signIn = () => {
		placeholder = 'Sign In link sending!';
		$page.stuff.supabase.auth.signIn({ email }).then((v) => {
			placeholder = 'Sign In link sent!'
		});
		email = '';
	};
	const signOut = () => $page.stuff.supabase.auth.signOut();
</script>

<div>
	{#if $session.user?.aud !== 'authenticated'}
		<form on:submit|preventDefault={signIn}>
			<input type="email" required {placeholder} bind:value={email} />
			<input disabled={!validEmail} type="submit" value="Sign In" />
		</form>
	{:else}
		<form on:submit|preventDefault={signOut}>
			<input type="email" bind:value={email} disabled={true} />
			<input type="submit" value="Sign Out" />
		</form>
	{/if}
</div>
