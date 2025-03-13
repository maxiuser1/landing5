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
	const imprimir = async () => {
		const payload = JSON.stringify({
			id: entrada.id,
			slug: evento.id,
			productos: productos,
			entradas: entradas.map((t) => {
				return {
					tickets: t.ticketing.tickets,
					reventas: t.ticketing.reventas,
					traspasos: t.ticketing.traspasos,
					paraMi: t.ticketing.paraMi
				};
			})
		});
		const resp = await fetch('/api/tickets', { method: 'POST', body: payload });
		const datapago = await resp.json();
		console.log('datapago', datapago);
	};
</script>

<Header {volver}></Header>
<Cabecera {evento} {imprimir} />
<Resumen {entradas} {productos}></Resumen>
