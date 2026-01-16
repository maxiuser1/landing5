<script lang="ts">
	import { formatDate } from '$lib/shared/formatos';
	
	let { evento } = $props();
</script>

<section class="principal">
	<h1>{evento.general.nombre}</h1>
	<div class="alcentro">
		<strong>{evento.ubicacion.nombre} </strong>
		<div>{formatDate(new Date(evento.fechas.fechaUnica))}</div>
	</div>
	
</section>

<style lang="scss">
	.importante {
		margin-top:1rem;
		font-weight: bold;
	}
	.principal {
		margin-top: 99px;
		margin-bottom: 32px;
		text-align: center;
	}
</style>
