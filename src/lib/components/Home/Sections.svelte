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

<br />
<br />
<br />

<br />
<br />
<br />

<style lang="scss">
	@import './static/style.scss';

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

		@include breakpoint($md) {
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
		@include breakpoint($md) {
			margin-top: initial;
		}
	}

	.container {
		margin-top: 33px;
		display: grid;

		grid-template-columns: 1fr;
		grid-template-areas:
			'side'
			'eventos';

		@include breakpoint($md) {
			grid-template-columns: 821px 260px;
			grid-template-areas: 'eventos side';
		}
	}

	.destacados {
		@include breakpoint($md) {
		}
	}

	.tarjetas {
		gap: 15px;

		@include breakpoint($md) {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
			margin-top: 36px;

			gap: 24px;
		}
	}
</style>
