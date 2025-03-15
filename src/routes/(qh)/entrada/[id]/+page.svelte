<script lang="ts">
	import { goto } from '$app/navigation';
	import { Cabecera, Resumen } from '$lib/components/Entrada/index.js';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { Impresora } from '$lib/icons/index.js';
	import { configureEntradas } from './tickets.svelte.js';

	let { data } = $props();
	let loading = $state(false);
	const { entrada, evento } = data;
	const entradas = configureEntradas(entrada);
	const productos = entrada.compras.filter((t) => t.tipo == 'producto');

	const volver = () => goto('/');
	const imprimir = async () => {
		loading = true;
		const ticketSet: App.TicketsSet = {
			id: entrada.id,
			entradas: entradas.map((t) => {
				const { tickets, reventas, traspasos, paraMi } = t.ticketing;
				return { tickets, reventas, traspasos, paraMi };
			})
		};
		const payload = JSON.stringify(ticketSet);
		const resp = await fetch('/api/tickets', { method: 'POST', body: payload });
		const response = await resp.json();
		loading = false;
	};
</script>

<Header {volver}></Header>

<Cabecera {evento} {imprimir} {loading} />

<Resumen {entradas} {productos}></Resumen>
