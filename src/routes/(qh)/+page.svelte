<script lang="ts">
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import Searchbox from '$lib/components/Home/Searchbox.svelte';
	import Sections from '$lib/components/Home/Sections.svelte';
	import { tsParticles } from 'tsparticles-engine';
	import { loadFull } from 'tsparticles';
	import { onMount } from 'svelte';
	import { particlesConfig } from '$lib/components/Home/particles';

	export let data;
	let { eventos } = data;

	onMount(async () => {
		await loadFull(tsParticles);
		await tsParticles.load('tsparticles', particlesConfig);
	});
</script>

<svelte:head>
	<style>
		body {
			background: #18191a;
		}
	</style>
</svelte:head>

<Carousel {eventos} />
<Searchbox />
<Sections {eventos} />
<div id="tsparticles" />

<style lang="scss">
</style>
