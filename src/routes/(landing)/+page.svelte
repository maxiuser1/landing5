<script lang="ts">
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import Sections from '$lib/components/Home/Sections.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { clearCompradata } from '$lib/components/Evento/store';
	import { createSearchStore, searchHandler } from '$lib/stores/search.js';
	import { Lupa } from '$lib/icons';

	export let data;
	let { eventos, banners } = data;

	const searchStore = createSearchStore(eventos);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	onMount(async () => {
		clearCompradata();
	});
</script>

<svelte:head>
	<style>
	</style>
	<meta name="google-site-verification" content="pl9VVmD7YcLmYEzm-KVoHjL1KJSyBI3YFJw7xnKRsJc" />
</svelte:head>

<Carousel eventos={banners} />

<Sections eventos={$searchStore.filtered} />

<style lang="scss">
	@import './static/style.scss';

	.bind {
		position: relative;
		z-index: 4;
	}
</style>
