<script lang="ts">
	import { signIn, signOut, signUp, useSession } from '$lib/auth/auth-client';
	import type { User } from 'better-auth';

	const session = useSession();

	let user = $state<User | null>(null);
	let mailInput = $state('');
	let passwordInput = $state('');

	session.subscribe((value) => {
		user = value?.data?.user || null;
	});

	const signUpHandler = async () => {
		try {
			const res = await signUp.email({
				email: mailInput,
				password: passwordInput,
				name: 'Test User',
				callbackURL: '/'
			});

			if (res.error) {
				throw new Error(res.error.message);
			}

			alert('Sign up successful! Please check your email to verify your account.');

			mailInput = '';
			passwordInput = '';
		} catch (error: any) {
			alert(`Sign up failed: ${error.message}`);
			console.error(error);
		}
	};

	const handleSignIn = async () => {
		try {
			const res = await signIn.email({
				email: mailInput,
				password: passwordInput,
				callbackURL: '/'
			});

			if (res.error) {
				throw new Error(res.error.message);
			}

			mailInput = '';
			passwordInput = '';
		} catch (error: any) {
			alert(`Sign in failed: ${error.message}`);
			console.error(error);
		}
	};

	const signOutHandler = async () => {
		await signOut();
	};
</script>

{#if session && user}
	<h2>Welcome, {user.name}!</h2>
	<p>{user.email}</p>
	<p>{user.id}</p>
	<button onclick={signOutHandler}>Sign Out</button>
{:else}
	<h2>Please sign up</h2>
	<form onsubmit={signUpHandler}>
		<input bind:value={mailInput} type="email" placeholder="Email" />
		<input bind:value={passwordInput} type="password" placeholder="Password" />
		<button type="submit">Sign Up</button>
		<button type="button" onclick={handleSignIn}>Sign In</button>
	</form>
{/if}

<style>
	@import 'tailwindcss';

	input {
		@apply my-1 border;
	}

	button {
		@apply border;
	}
</style>
