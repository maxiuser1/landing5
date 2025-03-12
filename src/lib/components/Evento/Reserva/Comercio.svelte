<script lang="ts">
	import { soles } from '$lib/shared/formatos';
	import CompraGeneral from './Compra-General.svelte';

	let { reserva, comercio } = $props();
</script>

<div class="vitrina mt-20">
	{#each comercio.productos as producto}
		{@const cantidad = reserva.count(producto.id)}
		{@const total = reserva.sum(producto.id)}

		<div class="caja">
			<img src={producto.img} alt={producto.nombre} />

			<p>{producto.nombre}</p>
			<div class="controles">
				<div class="total">
					{#if total > 0}
						{soles(total)}
					{:else}
						{soles(producto.precio)}
					{/if}
				</div>

				<CompraGeneral
					{cantidad}
					inc={() => reserva.incProducto(producto)}
					dec={() => reserva.decProducto(producto.id)}
				/>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.controles {
		display: flex;
		gap: 24px;
		flex-direction: column;
		align-items: center;
	}
	.total {
		color: var(--pink);
		margin-top: 8px;
		display: flex;
		justify-content: center;
	}

	.caja {
		margin: 12px 0;
		padding: 32px 12px 12px;
		background-color: #fff;

		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 12px;
		img {
			width: 100px;
		}
	}

	.vitrina {
	}
</style>
