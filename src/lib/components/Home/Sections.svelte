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

<br />
<br />
<br />
<section class="proximamente">
	<div class="container">
		<h1>Eventos Pasados</h1>
		<div class="tarjetas">
			<div class="tarjeta">
				<img src="https://imagizer.imageshack.com/img923/9513/JJj6ag.jpg" alt="card" />
			</div>
			<div class="tarjeta">
				<img src="https://imagizer.imageshack.com/img924/7946/hax9C8.jpg" alt="card" />
			</div>
			<div class="tarjeta">
				<img src="https://imagizer.imageshack.com/img923/1156/T2Jo6H.jpg" alt="card" />
			</div>
			<div class="tarjeta">
				<img src="https://imagizer.imageshack.com/img922/9371/RhWEoN.jpg" alt="card" />
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
