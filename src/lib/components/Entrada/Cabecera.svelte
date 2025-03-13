<script lang="ts">
	import { Impresora } from '$lib/icons';
	import { formatDate } from '$lib/shared/formatos';

	let { evento, imprimir } = $props();
</script>

<section class="principal">
	<h1>{evento.general.nombre}</h1>
	<div class="alcentro">
		<strong>{evento.ubicacion.nombre} </strong>
		<div>{formatDate(new Date(evento.fechas.fechaUnica))}</div>
	</div>
	<div class="centrado mt-20">
		<button class="btn--outline" onclick={imprimir}>Imprimir constancia <Impresora /></button>
	</div>
</section>

<style lang="scss">
	.principal {
		margin-top: 99px;
		margin-bottom: 32px;
		text-align: center;
	}

	.btn--outline {
		display: flex;
		gap: 8px;
		align-items: center;
	}
</style>
