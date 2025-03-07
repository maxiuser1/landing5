<script lang="ts">
	import Cards from './Cards.svelte';
	import Destacados from './Destacados.svelte';
	export let eventos: Array<App.Evento>;
</script>

<div class="container">
	<div class="eventos">
		<section class="destacados" id="destacados">
			<Cards {eventos} />
		</section>
	</div>
	<div class="side">
		<Destacados />
	</div>
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;

	.proximamente {
		h1 {
			margin: 10px 0;
			color: white;
		}

		img {
			width: 300px;
		}
	}

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

	.tarjetas {
		gap: 15px;

		@include mixin.breakpoint(mixin.$md) {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			margin-top: 36px;

			gap: 24px;
		}
	}
</style>
