<script lang="ts">
	import { goto } from '$app/navigation';
	import { Breadcrumbs, Steps } from '$lib/components/Evento';
	import Resumen from '$lib/components/Evento/Resumen.svelte';
	import { clearCompradata } from '$lib/components/Evento/store';
	import Zonas from '$lib/components/Evento/Zonas.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { handlee } from '$lib/utils/errorer';
	import Mistica from '$lib/components/Evento/Mistica.svelte';

	export let data;
	let { evento, parrilla } = data;

	clearCompradata();

	const seleccionar = ({ detail }: any) => {
		try {
			const esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';
			const zonaEvento: App.Precio = evento.precios.find((t: App.Precio) => t.codigo == detail.zona)!;

			if (zonaEvento.tipo == 'Asientos' || zonaEvento.tipo == 'BOX') {
				goto(`../${zonaEvento.codigo}/lugar${$page.url.search ?? ''}`);
			} else {
				esPromotor ? goto(`${zonaEvento.codigo}/venta`) : goto(`${zonaEvento.codigo}/reserva${$page.url.search ?? ''}`);
			}
		} catch (err) {
			handlee(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	};
</script>

<Breadcrumbs {evento} />

<Mistica {evento} {parrilla} on:seleccionar={seleccionar} />

<style lang="scss">
	@use './static/style.scss' as mixin;
	.container {
		padding-right: initial;
		padding-left: initial;
	}

	.principal {
		display: flex;
		gap: 8px;
		margin-bottom: 80px;
		flex-direction: column;
		@include mixin.breakpoint(mixin.$md) {
			flex-direction: row;
			gap: 24px;
		}
	}

	.prota {
		border-radius: 8px;
		background: white;
		.titulos {
			padding: 20px 20px 0px;
			@include mixin.breakpoint(mixin.$md) {
				padding: initial;
			}
		}

		@include mixin.breakpoint(mixin.$md) {
			width: 60%;
			padding: 24px 48px;
		}
	}
</style>
