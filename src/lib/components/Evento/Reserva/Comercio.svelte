<script lang="ts">
	import CompraGeneral from './Compra-General.svelte';

	let { reserva, comercio } = $props();
</script>

<div class="vitrina mt-20">
	{#each comercio.productos as producto}
		{@const cantidad = reserva.count(producto.id)}

		<div class="caja">
			<img src={producto.img} alt={producto.nombre} />

			<p>{producto.nombre}</p>
			<div>
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
