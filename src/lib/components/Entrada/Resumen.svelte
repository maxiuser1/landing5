<script lang="ts">
	import { soles } from '$lib/shared/formatos';

	let { entrada } = $props();
</script>

<div class="compras mt-40">
	{#each entrada.compras as compra, idx}
		<div class="compra" class:compra--odd={idx % 2 == 0}>
			<div>
				{compra.nombre}
				{#if compra.cantidad > 1}
					<small>x{compra.cantidad}</small>
				{/if}
			</div>
			<div class="precio">{soles(compra.total)}</div>
			<div></div>
		</div>
	{/each}
</div>

<style lang="scss">
	.precio {
		text-align: right;
	}
	.compra {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		padding: 18px 32px;

		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}
</style>
