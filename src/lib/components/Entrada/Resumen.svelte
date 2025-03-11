<script lang="ts">
	import { soles } from '$lib/shared/formatos';
	import EntradaGeneral from './Entrada-General.svelte';

	let { entrada } = $props();
</script>

<div class="mt-40">
	<div class="titulos">
		<div>Ticket</div>
		<div>Precio</div>
		<div class="mias">Mías</div>
	</div>
	{#each entrada.compras as compra, idx}
		<div class="compra">
			{#if compra.tipo == 'entrada'}
				{@const tickets = entrada.tickets.filter((t: App.Ticket) => t.compraId === compra.id)}
				<EntradaGeneral {compra} {tickets} />
			{/if}
		</div>
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
	.precio {
		text-align: right;
	}
	.compra {
		margin: 12px 0;
		padding: 32px 12px 12px;
		background-color: #fff;
	}
</style>
