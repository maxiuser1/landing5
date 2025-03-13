<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import Comercios from '$lib/components/Evento/Reserva/Comercios.svelte';
	import Pago from '$lib/components/Evento/Reserva/Pago.svelte';
	import Resumen from '$lib/components/Evento/Reserva/Resumen.svelte';
	import Zonas from '$lib/components/Evento/Reserva/Zonas.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { getReserva } from './reserva.svelte.js';

	let { data } = $props();
	const { evento, comercios }: { evento: App.Evento; comercios: App.Comercio[] } = data;
	let loading = $state(false);
	const reserva = getReserva(evento, comercios);
	const volver = () => goto(`/${evento.id}`);

	const pagar = async () => {
		reserva.tab = 'pago';
		loading = true;
		const { total, compras } = reserva;
		const { id: slug } = evento;
		const payload = JSON.stringify({ total, slug, compras });
		const resp = await fetch('/api/miturno', { method: 'POST', body: payload });
		const datapago = await resp.json();
		VisanetCheckout.configure({
			...datapago,
			complete: (params: any) => (loading = false),
			cancel: () => {
				loading = false;
				reserva.tab = 'inicio';
			}
		});
		VisanetCheckout.open();
	};
</script>

<svelte:head>
	<script type="text/javascript" src={PUBLIC_NIUBIZ_LIBRE}></script>
</svelte:head>
<Header {volver} />

<Zonas {evento} {reserva} />
<Comercios {reserva} {comercios} />
<Pago {reserva} {pagar} {loading} />

{#if reserva.total > 0 && !loading}
	<section class="minicontainer">
		<Resumen {evento} {reserva} />
	</section>
{/if}

{reserva.tab}
{reserva.mapa}

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.pagar {
		display: flex;
		justify-content: center;
	}
</style>
