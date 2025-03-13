<script lang="ts">
	import { soles } from '$lib/shared/formatos';

	let { compra } = $props();
</script>

<div class="contenedor">
	<div>{compra.nombre}</div>
	<div class="total">{soles(compra.total)}</div>
	<div class="total">
		<strong>x{compra.cantidad}</strong>
	</div>
</div>

<style lang="scss">
	.contenedor {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
		align-items: center;
	}
	.total {
		text-align: right;
	}

	strong {
		color: var(--pink);
		font-size: 20px;
	}
</style>
