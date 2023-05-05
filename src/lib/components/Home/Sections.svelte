<script lang="ts">
	import Cards from './Cards.svelte';
	export let eventos: Array<App.Evento>;
</script>

<section class="destacados" id="destacados">
	<div class="container">
		<Cards {eventos} />
	</div>
</section>
<br />
<br />
<br />

<section class="proximamente">
	<div class="container">
		<h1>Próximamente</h1>
		<div>
			<a rel="noreferrer" target="_blank" href="https://wa.me/51919293256"> <img src="https://res.cloudinary.com/dpywuss2o/image/upload/v1683245959/PSX_20230503_222104_jsu4py.jpg" alt="bprxo" /></a>
		</div>
	</div>
</section>
<br />
<br />
<br />

<!-- <section class="final" id="conciertos">
	<div class="container">
		<Cards {eventos} />
	</div>
</section> -->
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

	.destacados {
		margin-top: 32px;
		@include breakpoint($md) {
			margin-top: 60px;
		}
	}
</style>
