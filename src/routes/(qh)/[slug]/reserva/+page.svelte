<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import Resumen from '$lib/components/Evento/Reserva/Resumen.svelte';
	import Zonas from '$lib/components/Evento/Reserva/Zonas.svelte';
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	import Spinner from '$lib/components/Shared/ui/Spinner.svelte';
	import { getReserva } from './reserva.svelte.js';

	let { data } = $props();
	const { evento }: { evento: App.Evento } = data;
	let loading = $state(false);
	const reserva = getReserva(evento);
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
<section class="minicontainer">
	<Zonas {evento} {reserva} />
</section>

{#if reserva.total > 0 && !loading}
	<section class="minicontainer">
		<Resumen {evento} {reserva} />
	</section>
{/if}

{#if reserva.total > 0}
	<section class="minicontainer pagar">
		<Boton {loading} onclick={pagar}>Pagar</Boton>
	</section>
{/if}

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.pagar {
		display: flex;
		justify-content: center;
	}
</style>
