<script lang="ts">
	import { Entradas, Info } from '$lib/components/Evento';
	import { page } from '$app/stores';
	import Entrada from '$lib/components/Evento/Entrada.svelte';
	import { tick } from 'svelte';

	export let data;
	let { ticketid } = data;
</script>

<svelte:head>
	<title>Invitados</title>
</svelte:head>

<iframe id="registro" src={'https://quehay-web.blackoffice360.com/registrar-asistentes/' + ticketid} title="Registro" />

<style lang="scss">
	@import './static/style.scss';
	iframe {
		width: 100%;
		height: 100vh;
		border: none;
	}
</style>
