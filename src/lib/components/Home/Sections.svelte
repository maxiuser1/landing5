<script lang="ts">
	import Cards from './Cards.svelte';
	export let eventos: Array<App.Evento>;
</script>

<div class="container">
	<div class="eventos">
		<section class="destacados" id="destacados">
			<Cards {eventos} />
		</section>
	</div>
	<div class="side">
		<div class="titulo--suprayado">Destacados</div>
		<div class="tarjetas" />
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

	.titulo--suprayado {
		font-size: 1.25rem;
	}

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
		margin-left: 24px;
		padding: 20px 10px;
		border-radius: 0.5rem;
		border: 1px solid #fff;
		background: var(--White-White_98, #f9f9f9);
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
	}

	.container {
		margin-top: 33px;
		display: grid;
		grid-template-columns: 821px 260px;
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
