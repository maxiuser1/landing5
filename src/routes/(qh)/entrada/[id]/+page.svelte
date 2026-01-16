<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Cabecera, Resumen } from '$lib/components/Entrada/index.js';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	import { Impresora } from '$lib/icons/index.js';
	import { configureEntradas } from './tickets.svelte.js';

	let { data } = $props();
	let loading = $state(false);
	let showSnackbar = $state(false);
	let message = $state('');
	const { entrada, evento } = data;
	const entradas = configureEntradas(entrada);
	const productos = entrada.compras.filter((t) => t.tipo == 'producto');
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

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
		showSnackbar = true;
	};

	$effect(() => {
		if (showSnackbar) {
			if (timeoutId) clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				showSnackbar = false;
			}, 3000);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	});
</script>

<Header {volver}></Header>
<Cabecera {evento}  />
<Resumen {entradas} {productos} {imprimir} {loading}></Resumen>



<div id="snackbar"  class:show={showSnackbar}>
	Entradas asignadas con éxito 🎉
</div>

<style lang="scss">
	#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>
