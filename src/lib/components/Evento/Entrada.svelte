<script lang="ts">
	import Zonas from '$lib/components/Evento/Zonas.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { handlee } from '$lib/utils/errorer';
	import { Tickets } from '.';
	import Compras from './Compras.svelte';
	import Calendario from '../Shared/ui/Calendario/Calendario.svelte';

	export let evento: App.Evento;

	const seleccionar = ({ detail }: any) => {
		try {
			const esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';
			const zonaEvento: App.Precio = evento.precios.find((t: App.Precio) => t.tipo == detail.zona)!;

			if (zonaEvento.numerado) {
				goto(`../${evento!.general!.slug}/${zonaEvento.tipo}/lugar${$page.url.search ?? ''}`);
			}
		} catch (err) {
			handlee(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	};
</script>

{#if evento?.general?.categoria == 'Tours'}
	<section class="minicontainer principal">
		<h4>{evento.general.nombre}</h4>
		<p>Seleccione el paquete:</p>
		<Zonas {evento} on:seleccionar={seleccionar} />
	</section>

	<Tickets {evento} on:seleccionar={seleccionar} />

	<section class="minicontainer principal">
		<Calendario {evento} />
	</section>
	<section class="minicontainer compras">
		<Compras />
	</section>
{:else}
	<section class="minicontainer principal">
		<h4>Entrada</h4>
		<p>Selecciona el tipo:</p>
		<Zonas {evento} on:seleccionar={seleccionar} />
	</section>

	<Tickets {evento} on:seleccionar={seleccionar} />

	<section class="minicontainer compras">
		<Compras />
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';

	.minicontainer {
		background-color: #f9f9f9;
		padding-bottom: 48px;
		@include breakpoint($md) {
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}

	.compras {
		margin-top: 24px;
		border-radius: 8px;
	}

	.principal {
		margin-top: 24px;
		h4 {
			padding-top: 24px;
			padding-bottom: 8px;
		}
	}
</style>
