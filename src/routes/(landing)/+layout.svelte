<script lang="ts">
	import HomeFooter from '$lib/components/Layout/Footer/Home-Footer.svelte';
	import HomeHeader from '$lib/components/Layout/Header/Home-Header.svelte';

	let { data, children } = $props();
	const { eventos, categorias } = data;
</script>

<HomeHeader {eventos} {categorias} />
<main>{@render children()}</main>
<HomeFooter />
