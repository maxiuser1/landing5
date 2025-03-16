<script lang="ts">
	import EntradaGeneral from './Entrada-General.svelte';

	let { entradas } = $props();
</script>

<div class="mt-20">
	<div class="titulos">
		<div>Entrada</div>
		<div class="derecha">Precio</div>
		<div class="derecha mr-12">#</div>
	</div>
	{#each entradas as entrada}
		<div class="compra">
			<EntradaGeneral {entrada} />
		</div>
	{/each}
</div>

<style lang="scss">
	.titulos {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
	}

	.compra {
		margin: 12px 0;
		padding: 32px 12px 12px;
		background-color: #fff;
	}
</style>
