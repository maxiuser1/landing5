<script lang="ts">
	import HomeFooter from '$lib/components/Layout/Footer/Home-Footer.svelte';
	import HomeHeader from '$lib/components/Layout/Header/Home-Header.svelte';

	let { children } = $props();
</script>

<HomeHeader />
<main>{@render children()}</main>
<HomeFooter />
