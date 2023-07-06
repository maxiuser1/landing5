<script lang="ts">
	import { PUBLIC_FIREBASE_PROJECTID } from '$env/static/public';
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import Searchbox from '$lib/components/Home/Searchbox.svelte';
	import Sections from '$lib/components/Home/Sections.svelte';
	import { tsParticles } from 'tsparticles-engine';
	import { loadFull } from 'tsparticles';
	import { onDestroy, onMount } from 'svelte';
	import { particlesConfig } from '$lib/components/Home/particles';
	import { clearCompradata } from '$lib/components/Evento/store';
	import { createSearchStore, searchHandler } from '$lib/stores/search.js';
	import { Lupa } from '$lib/icons';

	export let data;
	let { eventos } = data;

	const searchStore = createSearchStore(eventos);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});

	onMount(async () => {
		console.log('v');
		clearCompradata();

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
	<meta name="google-site-verification" content="pl9VVmD7YcLmYEzm-KVoHjL1KJSyBI3YFJw7xnKRsJc" />
</svelte:head>

<Carousel {eventos} />

<section class="bind container">
	<div class="searchbox">
		<div class="box">
			<input type="search" class="input" placeholder="Encuentra tu evento" bind:value={$searchStore.search} />
			<div class="boton">
				<Lupa />
			</div>
		</div>
	</div>
</section>

<Sections eventos={$searchStore.filtered} />
<div id="tsparticles" />

<style lang="scss">
	@import './static/style.scss';

	.bind {
		position: relative;
		z-index: 4;
		.searchbox {
			padding-left: 24px;
			padding-right: 24px;
			text-align: center;
			margin-top: -12px;
			display: flex;
			justify-content: center;
			.box {
				width: 100%;
				height: 48px;

				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: white;
				box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
				border-radius: 4px;
				background-color: #310b6b;

				@include breakpoint($md) {
					height: 56px;
				}
			}

			.input {
				padding-left: 16px;
				font-family: 'Gotham';
				line-height: 20px;
				width: 100%;
				color: white;
				border-color: transparent;
				outline-offset: -2px;
				background-color: #310b6b;

				font-size: 16px;
				&:focus {
					outline: none;
				}
			}

			.boton {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-right: 12px;
				gap: 8px;
				height: 40px;
				width: 56px;
				background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
				border-radius: 4px;
			}
		}
	}
</style>
