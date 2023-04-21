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

<!-- <section class="final" id="conciertos">
	<div class="container">
		<Cards {eventos} />
	</div>
</section> -->
<style lang="scss">
	@import './static/style.scss';
	.destacados {
		margin-top: 32px;
		@include breakpoint($md) {
			margin-top: 60px;
		}
	}
</style>
