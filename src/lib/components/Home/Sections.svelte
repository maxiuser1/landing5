<script lang="ts">
	import Cards from './Cards.svelte';
	export let eventos: Array<App.Evento>;
</script>

<section class="destacados" id="destacados">
	<div class="container">
		<Cards {eventos} />
	</div>
</section>

<section class="final" id="conciertos">
	<div class="container">
		<Cards {eventos} />
	</div>
</section>

<style lang="scss">
	section {
		padding-left: 24px;
		padding-right: 24px;
	}
	.final {
		margin-bottom: 80px;
	}

	.destacados {
		margin-top: 32px;
		@include breakpoint($md) {
			margin-top: 60px;
		}
	}

	.botonera {
		width: 100%;
		text-align: center;
	}
	.vermas {
		color: #d30ed1;
		padding: 12px 16px;
		margin-top: 32px;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		background: none;
		border: 1px solid #d30ed1;
		border-radius: 4px;
	}

	.titulo {
		text-decoration: none;
		position: relative;
		color: var(--pink);
		font-weight: 700;
		font-size: 24px;
		line-height: 36px;
		@include breakpoint($md) {
			font-size: 30px;
		}
	}

	.titulo:before {
		position: absolute;
		content: '';
		height: 4px;
		bottom: -4px;

		margin: 0 auto;
		left: 0;
		width: -webkit-calc(100% - 6px);
		width: -moz-calc(100% - 6px);
		width: calc(100% - 6px);
		background: var(--pink);
	}

	.titulo:after {
		position: absolute;
		content: '';
		height: 2px;
		bottom: -4px;

		margin: 0 auto;
		right: 0;
		width: 4px;
		height: 4px;
		border: 1px solid var(--pink);
	}
</style>
