<script lang="ts">
	import { soles } from '$lib/shared/formatos';

	let { compra } = $props();
</script>

<div class="contenedor">
	<div>
		{compra.nombre}
	</div>
	<div class="total">{soles(compra.total)}</div>
</div>

<style lang="scss">
	.contenedor {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}
	.total {
		text-align: right;
	}
</style>
