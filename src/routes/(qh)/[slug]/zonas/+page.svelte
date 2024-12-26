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
	let { evento } = data;

	clearCompradata();

	const seleccionar = ({ detail }: any) => {
		try {
			const esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';
			const zonaEvento: App.Precio = evento.precios.find((t: App.Precio) => t.tipo == detail.zona);

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

<Breadcrumbs {evento} />

{#if evento.general.slug == 'mistica'}
	<Mistica {evento} on:seleccionar={seleccionar} />
{:else}
	<Steps paso={1} />
	<section class="container">
		<div class="principal">
			<div class="prota">
				<div class="titulos">
					<h4>Entrada</h4>
					<p>Selecciona en que sector deseas adquirir y luego continua el proceso</p>
				</div>
				<Zonas {evento} on:seleccionar={seleccionar} />
			</div>
			<Resumen {evento} />
		</div>
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';
	.container {
		padding-right: initial;
		padding-left: initial;
	}

	.principal {
		display: flex;
		gap: 8px;
		margin-bottom: 80px;
		flex-direction: column;
		@include breakpoint($md) {
			flex-direction: row;
			gap: 24px;
		}
	}

	.prota {
		border-radius: 8px;
		background: white;
		.titulos {
			padding: 20px 20px 0px;
			@include breakpoint($md) {
				padding: initial;
			}
		}

		@include breakpoint($md) {
			width: 60%;
			padding: 24px 48px;
		}
	}
</style>
