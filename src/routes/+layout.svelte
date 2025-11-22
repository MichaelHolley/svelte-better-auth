<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { useSession } from '$lib/auth/auth-client';

	let { children } = $props();

	const session = useSession();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="m-4">
	<div class="mb-8">
		<a href="/" class="underline">Home</a>
	</div>
	{#if $session.isPending || $session.isRefetching}
		<p>Loading session...</p>
	{:else}
		{@render children()}
	{/if}
</div>
