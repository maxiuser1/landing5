<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { Impresora } from '$lib/icons/index.js';

    let { data } = $props();
    const evento = data.evento;

    const volver = () => goto('/');
</script>



<Header {volver}></Header>

<section class="principal">
	<h1>{evento.general.nombre}</h1>
	<div class="alcentro">
		<strong>{evento.ubicacion.nombre} </strong>
	</div>
	<div class="alcentro">
		Links de acceso
	</div>
	<div class="centrado mt-20 flexed">
		{#if data.invitacion!.cantidad > 1}{
			` ${data.invitacion!.cantidad} pesonas`
		} 
		{:else} 
			'1 persona'
		{/if}
		<a class="btn" href={page.url + '/acceso'}>Mi QR de ingreso <Impresora /></a>
	</div>
</section>

<style lang="scss">
	.principal {
		margin-top: 99px;
		margin-bottom: 32px;
		text-align: center;
	}

	.alcentro {
		margin-top: 1rem;
	}
</style>
