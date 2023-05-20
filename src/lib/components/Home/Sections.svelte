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
		<br />

		<div>
			<a rel="noreferrer" target="_blank" href="https://wa.me/51919293256"> <img src="https://res.cloudinary.com/dpywuss2o/image/upload/v1684602032/ticketera/banners/AGENDA_AUTOCONTROL_1_matgcn.jpg" alt="bprxo" /></a>
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
