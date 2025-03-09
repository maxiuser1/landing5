<script lang="ts">
	import { Silla } from '$lib/icons';
	import { soles } from '$lib/shared/formatos';
	import CompraGeneral from './Compra-General.svelte';

	let { reserva } = $props();
</script>

<div class="compra compra--title">
	<h5>Ticket</h5>
	<h5 class="precios">Precio</h5>
</div>
{#each reserva.compras as compra, idx}
	<div class="compra" class:compra--odd={idx % 2 == 0}>
		<h6>{compra.nombre}</h6>
		<div class="precios">
			{soles(compra.precio)}
		</div>
		{#if compra.tipo == 'General'}
			<CompraGeneral {compra} inc={() => reserva.inc(compra)} dec={() => reserva.dec(compra)} />
		{/if}
		{#if compra.tipo == 'Asientos'}
			<div class="botonera">
				<button class="button--icon" onclick={() => reserva.setMapa(compra.codigo)}>
					<Silla />
				</button>
			</div>
		{/if}
	</div>
{/each}

<style lang="scss">
	.botonera {
		display: flex;
		justify-content: flex-end;
		button {
			color: #777777;
			&:hover {
				color: var(--red);
			}
		}
	}
	.precios {
		text-align: right;
	}
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
</style>
