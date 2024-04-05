<script>
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
					<h4>Consideración</h4>
					<div class="consideraciones">
						<ol>
							<li>El ticket es un comprobante válido de tu compra, por lo que no será canjeado por una entrada tradicional en el punto de venta o boletería.</li>
							<li>Para descargar el ticket deberás ingresar con tu usuario a "MI CUENTA", ahí encontrarás el detalle de tu compra y tus tickets para descarga.</li>
							<li>Descárgalo al menos un día antes del evento.</li>
							<li>Con el ticket puedes acercarte directamente al evento presentándolo de manera virtual o puedes llevarlo impreso.</li>
							<li>Al elegir ticket, estas aceptando no divulgarlo, ni compartirlo con terceros, ya que esto podría afectar tu ingreso al evento.</li>
							<li>
								Al igual que una entrada tradicional, el ticket tendrá un sistema de control y seguridad para el acceso al evento, el cual también impedirá que en caso de generarse duplicados ingrese más de una persona con el mismo ticket,
								permitiendo el ingreso solo a la primera persona registrada.
							</li>
						</ol>
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

	.consideraciones {
		padding-left: 20px;
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
