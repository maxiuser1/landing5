<script lang="ts">
	import Zonas from '$lib/components/Evento/Zonas.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { handlee } from '$lib/utils/errorer';

	export let evento: App.Evento;

	const seleccionar = ({ detail }: any) => {
		try {
			const esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';
			const zonaEvento: App.Precio = evento.precios.find((t: App.Precio) => t.tipo == detail.zona)!;

			if (zonaEvento.numerado) {
				goto(`${zonaEvento.tipo}/lugar${$page.url.search ?? ''}`);
			} else {
				esPromotor ? goto(`${zonaEvento.tipo}/venta`) : goto(`${zonaEvento.tipo}/reserva${$page.url.search ?? ''}`);
			}
		} catch (err) {
			handlee(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	};
</script>

<div class="container">
	<section>
		<h4>Entrada</h4>
		<p>Selecciona en que sector deseas adquirir tu entrada.</p>
		<Zonas {evento} on:seleccionar={seleccionar} />
	</section>
</div>

<style lang="scss">
	@import './static/style.scss';

	.container {
		display: flex;
		justify-content: center;
	}

	section {
		max-width: 728px;
		width: 728px;
		padding: 32px;
		margin-top: 48px;
		margin-bottom: 24px;
		border-radius: 8px;
		background: #f9f9f9;
	}
</style>
