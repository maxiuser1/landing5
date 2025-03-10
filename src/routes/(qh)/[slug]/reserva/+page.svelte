<script lang="ts">
	import { goto } from '$app/navigation';
	import CompraGeneral from '$lib/components/Evento/Reserva/Compra-General.svelte';
	import Resumen from '$lib/components/Evento/Reserva/Resumen.svelte';
	import Zonas from '$lib/components/Evento/Reserva/Zonas.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { getReserva } from './reserva.svelte.js';

	let { data } = $props();
	const { evento }: { evento: App.Evento } = data;
	const reserva = getReserva(evento);

	function volver() {
		goto(`/${evento.id}`);
	}

	const pagar = async () => {
		const resp = await fetch('/api/miturno', {
			method: 'POST',
			body: JSON.stringify({
				total: reserva.total,
				slug: evento.id,
				compras: reserva.compras
			})
		});
		const response = await resp.json();
		goto(`/pagar/${response}`);
	};
</script>

<section class="minicontainer">
	<Zonas {evento} {reserva} />
</section>

{#if reserva.total > 0}
	<section class="minicontainer">
		<Resumen {evento} {reserva} />

		<button type="button" class="btn" onclick={pagar}>Pagar</button>
	</section>
{/if}

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.minicontainer {
		margin: 0 auto 24px;
		width: 100%;
		padding-right: 16px;
		padding-left: 16px;
		background-color: #f9f9f9;

		@include mixin.breakpoint(mixin.$md) {
			padding: 40px;
			max-width: 728px;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}
</style>
