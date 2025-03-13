<script lang="ts">
	import Producto from './Producto.svelte';

	let { productos } = $props();
</script>

{#if productos.length > 0}
	<div class="mt-40">
		<div class="titulos__productos">
			<div>Producto</div>
			<div class="derecha">Precio</div>
			<div class="mias">#</div>
		</div>
		{#each productos as compra, idx}
			<div class="compra">
				<Producto {compra} />
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.mias {
		text-align: right;
		margin-right: 12px;
	}

	.compra {
		margin: 12px 0;
		padding: 32px 12px 12px;
		background-color: #fff;
	}

	.titulos__productos {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
	}
</style>
