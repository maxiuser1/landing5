<script lang="ts">
	import Cards from '$lib/components/Home/Cards.svelte';
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import { page } from '$app/state';
	import Destacados from '$lib/components/Home/Destacados.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	let eventos = $state(data.eventos);
	$effect(() => {
		if (page.url.hash) {
			console.log(page.url.hash);
			eventos = data.eventos?.filter((evento) => evento.categoria == page.url.hash.slice(1));
		} else eventos = data.eventos;
	});
</script>

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

<style lang="scss">
	@use '../../../static/style.scss' as mixin;
	@forward '../../../static/container.scss';

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
