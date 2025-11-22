<script lang="ts">
	import { signIn, signOut, signUp, useSession } from '$lib/auth/auth-client';

	const session = useSession();

	let mailInput = $state('');
	let passwordInput = $state('');

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

	const signInWithGitHub = async () => {
		const data = await signIn.social({
			provider: 'github'
		});
	};

	const signOutHandler = async () => {
		await signOut();
	};
</script>

{#if $session && $session.data && $session.data.user}
	<h2>Welcome, {$session.data.user.name}!</h2>
	<p>{$session.data.user.email}</p>
	<p>{$session.data.user.id}</p>
	<img src={$session.data.user.image} alt="User Avatar" class="size-8" />
	<button onclick={signOutHandler} class="mt-1 border">Sign Out</button>
{:else}
	<h2>Please sign up</h2>
	<form onsubmit={signUpHandler}>
		<input bind:value={mailInput} type="email" placeholder="Email" class="my-1 border" />
		<input bind:value={passwordInput} type="password" placeholder="Password" class="my-1 border" />
		<button type="button" class="border px-1">Sign Up</button>
		<button type="submit" onclick={handleSignIn} class="border px-1">Sign In</button>
	</form>
	<button onclick={signInWithGitHub} class="mt-4 border px-1">Sign In with GitHub</button>
{/if}

<div class="mt-6">
	<a class="underline" href="/secure">Go to Secure Page</a>
	<br />
	<a class="underline" href="/anonymous">Go to Anonymous Page</a>
</div>
