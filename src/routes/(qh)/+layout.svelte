<script lang="ts">
	import Footer from '$lib/components/Layout/Footer/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<style>
		body {
			margin-top: 44px;
		}
	</style>
</svelte:head>

<main>{@render children()}</main>
<Footer />
