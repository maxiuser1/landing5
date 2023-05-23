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
<section class="proximamente">
	<div class="container">
		<h1>Eventos Pasados</h1>
		<div class="tarjetas">
			<div class="tarjeta">
				<img src="https://res.cloudinary.com/dpywuss2o/image/upload/v1683775105/ticketera/banners/PSX_20230510_203607_w6qg82.jpg" alt="card" />
			</div>
			<div class="tarjeta">
				<img src="https://res.cloudinary.com/dpywuss2o/image/upload/v1684806729/samples/BANNER-TICKETERA_hnepeg_cppyrj.jpg" alt="card" />
			</div>
		</div>
	</div>
</section>

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

	.destacados {
		margin-top: 32px;
		@include breakpoint($md) {
			margin-top: 60px;
		}
	}

	.tarjetas {
		margin-top: 24px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(342px, 1fr));
		gap: 15px;

		@include breakpoint($md) {
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			margin-top: 36px;

			gap: 24px;
		}
	}
</style>
