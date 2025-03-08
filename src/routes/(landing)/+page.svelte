<script lang="ts">
	import Cards from '$lib/components/Home/Cards.svelte';
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import Destacados from '$lib/components/Home/Destacados.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<Carousel eventos={data.banners} />

<div class="container">
	<div class="eventos">
		<section class="destacados" id="destacados">
			<Cards eventos={data.eventos ?? []} />
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
