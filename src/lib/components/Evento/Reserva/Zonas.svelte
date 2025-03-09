<script lang="ts">
	import Silla from '$lib/icons/Silla.svelte';
	import { EventosRepo } from '$lib/repos/eventosRepo';
	import { soles } from '$lib/shared/formatos';
	import AsientoPicker from './Asiento-Picker.svelte';
	import BoxPicker from './Box-Picker.svelte';
	import CompraGeneral from './Compra-General.svelte';
	import Tickets from './Tickets.svelte';

	let { evento, reserva } = $props();
</script>

<h4>Entrada</h4>
<p>Selecciona sus entradas:</p>
<div class="mapa">
	<!-- <img src={evento.caratula.mapa} alt="mapa" /> -->
</div>
{reserva.mapa}
{reserva.tab}
{#if reserva.tab == 'inicio'}
	<Tickets {reserva} />
{/if}

{#each evento.precios as precio}
	{#if precio.tipo == 'BOX' && reserva.mapa == precio.codigo}
		<BoxPicker {reserva} {precio} />
	{/if}
	{#if precio.tipo == 'Asientos' && reserva.mapa == precio.codigo}
		<AsientoPicker {reserva} {precio} />
	{/if}
{/each}

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.mapa {
		display: flex;
		justify-content: center;
		img {
			max-width: 250px;
			display: none;
		}
	}
</style>
