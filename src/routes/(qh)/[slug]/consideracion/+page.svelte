<script>
	import * as prismicH from '@prismicio/helpers';
	import { Resumen, Steps } from '$lib/components/Evento';
	import Compras from '$lib/components/Evento/Compras.svelte';
	import { Arrow } from '$lib/icons';
	import { page } from '$app/stores';
	export let data;
	let { evento } = data;

	let esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';
</script>

<section class="container">
	<div>
		<div class="principal">
			<div class="steps">
				<Steps paso={2} />
			</div>
			<div class="lugar">
				<div class="titulos">
					<h1>Consideraciones</h1>
					<div class="consideraciones">
						{@html prismicH.asHTML(data.document.data.texto)}
					</div>
				</div>
			</div>

			<div class="lugar">
				<Compras />
			</div>
		</div>
	</div>
	<div class="detalles">
		<Resumen {evento} />
		<br />
		<a href="../../{evento.general.slug}/{esPromotor ? 'venta' : 'reserva'}" class="btn">Continuar <Arrow /> </a>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.btn {
		width: 300px;
	}

	.steps {
		padding: 40px 16px 32px;
	}

	.letra {
		font-size: 12px;
		font-weight: 900;
	}

	ol {
		li {
			margin-bottom: 10px;
		}
	}

	.mapa {
		margin-left: 20px;
		@include breakpoint($md) {
			margin-left: initial;
		}
	}
	.asientos {
		padding-top: 30px;
		width: 99%;
		overflow-x: auto;
		.fila {
			display: flex;
			flex-wrap: nowrap;
			gap: 4px;
			padding-bottom: 10px;
		}
	}

	.lugar {
		border-radius: 8px;
		background: #f9f9f9;

		margin-bottom: 20px;
		padding: 40px 32px;
		h4 {
			font-weight: 100;
			margin-bottom: 10px;
		}

		.titulos {
			margin-bottom: 32px;
		}

		@include breakpoint($md) {
			margin-right: 24px;
		}
	}

	.principal {
		@include breakpoint($md) {
			padding-right: 8px;
			min-height: 90vh;
		}
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include breakpoint($md) {
			grid-template-columns: 728px 352px;
		}
	}

	.detalles {
		padding: 40px 24px;
		min-width: 100%;
		border: 1px solid #fff;
		background: var(--White-White_98, #f9f9f9);
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

		.btn {
			width: 100%;
			margin-top: 40px;
			font-size: 16px;
			font-weight: 700;
		}
	}
</style>
