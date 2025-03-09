<script lang="ts">
	import { Radio } from '$lib/icons';
	import { soles } from '$lib/shared/formatos';
	import CompraGeneral from './Compra-General.svelte';

	let { evento, reserva } = $props();
</script>

<h4>Entrada</h4>
<p>Selecciona sus entradas:</p>
<div class="mapa">
	<!-- <img src={evento.caratula.mapa} alt="mapa" /> -->
</div>

<div class="compra compra--title">
	<h5>Ticket</h5>
	<h5>Precio</h5>
</div>
{#each reserva.compras as compra, idx}
	<div class="compra" class:compra--odd={idx % 2 == 0}>
		<h6>{compra.nombre}</h6>
		{soles(compra.precio)}
		<CompraGeneral {compra} inc={() => reserva.inc(compra)} dec={() => reserva.dec(compra)} />
	</div>
{/each}

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
	.compra {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		padding: 18px 32px;

		&--title {
			padding-bottom: 0px;
		}
		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}
	.mapa {
		display: flex;
		justify-content: center;
		img {
			max-width: 250px;
			display: none;
		}
	}
</style>
