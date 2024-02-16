<script lang="ts">
	import Step from './Step.svelte';

	export let paso: number;
	export let zona: App.Precio | undefined = undefined;
</script>

<section class="container wizard">
	<div class="mpasos">
		{#if paso == 1 || paso == 2}
			<Step numero="1" titulo="Entrada" subtitulo="Elige el tipo de entrada" seleccionado={true} />
			<Step numero="2" titulo="" subtitulo="" seleccionado={false} />
		{:else if paso == 4}
			<Step numero="3" titulo="Pagar" subtitulo="Lugar reservado" seleccionado={true} />
		{/if}
	</div>

	<div class="pasos">
		<Step numero="1" titulo="Zona" subtitulo={zona?.nombre ?? 'Elige el tipo de entrada'} seleccionado={true} />

		<Step numero="2" titulo="Lugar" subtitulo="¿Donde quieres?" seleccionado={paso >= 2} />

		<Step numero="3" titulo="Pagar" subtitulo="Método de pago" seleccionado={paso >= 4} />
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';
	.wizard {
		.mpasos {
			margin: 10px 0px;
			display: flex;
			justify-content: space-between;
			@include breakpoint($md) {
				display: none;
			}
		}

		.pasos {
			margin: 49px 0px;
			display: none;
			width: 100%;
			gap: 24px;
			justify-content: space-between;

			@include breakpoint($md) {
				display: flex;
			}
		}
	}
</style>
