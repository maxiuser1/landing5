<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cabecera, Resumen } from '$lib/components/Entrada/index.js';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { configureEntradas } from './tickets.svelte.js';

	let { data } = $props();
	const { entrada, evento } = data;
	const entradas = configureEntradas(entrada);
	const productos = entrada.compras.filter((t) => t.tipo == 'producto');

	const volver = () => goto('/');
	const imprimir = () => {
		console.log('aer', entradas[0].ticketing.tickets);
	};
</script>

<Header {volver}></Header>
<Cabecera {evento} {imprimir} />
<Resumen {entradas} {productos}></Resumen>
