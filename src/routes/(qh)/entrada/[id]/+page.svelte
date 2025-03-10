<script lang="ts">
	import { goto } from '$app/navigation';
	import Resumen from '$lib/components/Entrada/Resumen.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { formatDate } from '$lib/shared/formatos';

	let { data } = $props();
	const { entrada, evento } = data;
	const volver = () => goto('/');
</script>

<Header {volver}></Header>

<section class="principal">
	<h1>Lugar Reservado</h1>
</section>
<section class="minicontainer">
	<div class="centrado">
		<h4>{evento.general.nombre}</h4>
		<h6>{evento.general.artista}</h6>
		<div class="mt-40"><strong>{formatDate(new Date(evento.fechas.fechaUnica))}</strong></div>
		<div>{evento.ubicacion.nombre}</div>
	</div>

	<Resumen {entrada}></Resumen>
</section>

<style lang="scss">
	.centrado {
		text-align: center;
	}
	.principal {
		margin-top: 99px;
		margin-bottom: 32px;
		text-align: center;
	}
</style>
