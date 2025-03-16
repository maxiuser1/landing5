<script lang="ts">
	import Cards from '$lib/components/Home/Cards.svelte';
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import { page } from '$app/state';
	import Destacados from '$lib/components/Home/Destacados.svelte';
	let { data } = $props();
	let eventos = $state(data.eventos);
	$effect(() => {
		eventos = page.url.hash
			? data.eventos?.filter((evento) => evento.categoria == page.url.hash.slice(1))
			: data.eventos;
	});
</script>

<svelte:head>
	<script async src="https://www.tiktok.com/embed.js"></script>
</svelte:head>

{#if !page.url.hash}
	<Carousel eventos={data.banners} />
{/if}
<div class="container">
	<div class="eventos">
		<section class="destacados" id="destacados">
			<Cards eventos={eventos ?? []} />
		</section>
	</div>
	<div class="side">
		<Destacados />
	</div>
</div>

<blockquote
	class="tiktok-embed"
	cite="https://www.tiktok.com/@quehayeventos.pe/video/7451646578198187270"
	data-video-id="7451646578198187270"
	style="max-width: 325px;min-width: 325px;"
>
	<section>
		<a target="_blank" title="@quehayeventos.pe" href="https://www.tiktok.com/@quehayeventos.pe?refer=embed"
			>@quehayeventos.pe</a
		>
		<a
			target="_blank"
			title="♬ sonido original - quehayeventos.pe"
			href="https://www.tiktok.com/music/sonido-original-7451646626266548998?refer=embed"
			>♬ sonido original - quehayeventos.pe</a
		>
	</section>
</blockquote>

<style lang="scss">
	@use '$lib/scss/container';
	@use '$lib/scss/breakpoints' as mixin;

	.side {
		min-width: 16.25rem;
		grid-area: side;

		@include mixin.breakpoint(mixin.$md) {
			border-radius: 0.5rem;
			border: 1px solid #fff;
			background: #f9f9f9;
			padding: 20px 10px;
			margin-left: 24px;
			box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
		}
	}

	.eventos {
		grid-area: eventos;
		margin-top: 24px;
		@include mixin.breakpoint(mixin.$md) {
			margin-top: initial;
		}
	}

	.container {
		margin-top: 33px;
		margin-bottom: 32px;
		display: grid;

		grid-template-columns: 1fr;
		grid-template-areas:
			'side'
			'eventos';

		@include mixin.breakpoint(mixin.$md) {
			grid-template-columns: 821px 260px;
			grid-template-areas: 'eventos side';
		}
	}

	.destacados {
		@include mixin.breakpoint(mixin.$md) {
		}
	}
</style>
