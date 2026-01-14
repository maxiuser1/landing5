<script lang="ts">
	import { page } from '$app/state';
	import { Impresora } from '$lib/icons';
	import { formatDate } from '$lib/shared/formatos';
	import Boton from '../Shared/ui/Boton.svelte';

	let { evento, imprimir, loading } = $props();
</script>

<section class="principal">
	<h1>{evento.general.nombre}</h1>
	<div class="alcentro">
		<strong>{evento.ubicacion.nombre} </strong>
		<div>{formatDate(new Date(evento.fechas.fechaUnica))}</div>
	</div>
	<div class="centrado mt-20 flexed">
		<Boton class="btn--outline" onclick={imprimir} {loading}>Guardar distribución</Boton>
		<a class="btn" href={page.url + '/mine'}>Mi QR de ingreso <Impresora /></a>
	</div>
	<p class="importante">
		Debe guardar la distribución para confimar los links de acceso y las entradas propias.
	</p>
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
