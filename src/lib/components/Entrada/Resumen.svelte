<script lang="ts">
	import { soles } from '$lib/shared/formatos';
	import EntradaGeneral from './Entrada-General.svelte';
	import Producto from './Producto.svelte';

	let { entrada } = $props();
</script>

<div class="mt-40">
	<div class="titulos">
		<div>Ticket</div>
		<div>Precio</div>
		<div class="mias">Para mí</div>
	</div>
	{#each entrada.compras as compra, idx}
		{#if compra.tipo == 'entrada'}
			{@const tickets = entrada.tickets.filter((t: App.Ticket) => t.compraId === compra.id)}
			<div class="compra">
				<EntradaGeneral {compra} {tickets} />
			</div>
		{/if}
	{/each}
</div>

<div class="mt-40">
	<div class="titulos">
		<div>Producto</div>
		<div></div>
		<div class="mias">Precio</div>
	</div>
	{#each entrada.compras as compra, idx}
		{#if compra.tipo == 'producto'}
			<div class="compra">
				<Producto {compra} />
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.mias {
		text-align: right;
		margin-right: 12px;
	}
	.titulos {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.compra {
		margin: 12px 0;
		padding: 32px 12px 12px;
		background-color: #fff;
	}
</style>
