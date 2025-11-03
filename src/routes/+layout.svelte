<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="m-4">
	<div class="mb-8">
		<a href="/" class="underline">Home</a>
	</div>
	{@render children()}
</div>
