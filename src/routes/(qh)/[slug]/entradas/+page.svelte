<script lang="ts">
	import { Breadcrumbs, Steps } from '$lib/components/Evento';
	import Resumen from '$lib/components/Evento/Resumen.svelte';
	import { compraData } from '$lib/components/Evento/store';
	import Zonas from '$lib/components/Evento/Zonas.svelte';
	import { onMount } from 'svelte';
	export let data;
	let { evento } = data;

	onMount(async () => {
		const compra: App.Compra = {
			evento: {
				id: evento.id,
				slug: evento.general?.slug,
				artista: evento.general?.artista,
				nombre: evento.general?.nombre,
				lugar: `${evento.ubicacion?.ciudad} ${evento.ubicacion?.nombre}`,
				fecha: evento.fechas[0].dia
			}
		};
		compraData.set(compra);
	});
</script>

<Breadcrumbs {evento} />
<Steps paso={1} />

<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Entrada</h4>
				<p>Selecciona en que sector deseas adquirir y luego continua el proceso</p>
			</div>
			<Zonas {evento} />
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
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
