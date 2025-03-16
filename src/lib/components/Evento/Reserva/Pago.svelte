<script lang="ts">
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	let { reserva, pagar, loading } = $props();
</script>

{#if reserva.tab == 'pago'}
	<section class="minicontainer">
		<h4>Pago</h4>

		<div class="consideraciones mt-40">
			<h6>Consideraciones</h6>
			<ul class="mt-20">
				<li>
					El ticket es un comprobante válido de tu compra, por lo que no será canjeado por una entrada tradicional en el
					punto de venta o boletería.
				</li>
				<li>
					Para descargar el ticket deberás ingresar con tu usuario a "MI CUENTA", ahí encontrarás el detalle de tu
					compra y tus tickets para descarga.
				</li>
				<li>Descárgalo al menos un día antes del evento.</li>
				<li>
					Con el ticket puedes acercarte directamente al evento presentándolo de manera virtual o puedes llevarlo
					impreso.
				</li>
				<li>
					Al elegir ticket, estas aceptando no divulgarlo, ni compartirlo con terceros, ya que esto podría afectar tu
					ingreso al evento.
				</li>
				<li>
					Al igual que una entrada tradicional, el ticket tendrá un sistema de control y seguridad para el acceso al
					evento, el cual también impedirá que en caso de generarse duplicados ingrese más de una persona con el mismo
					ticket, permitiendo el ingreso solo a la primera persona registrada.
				</li>
			</ul>
		</div>

		<div class="botonera mt-40">
			<button class="btn--outline" onclick={() => (reserva.tab = 'comercios')}>Volver</button>
			<Boton onclick={pagar} {loading}>Pagar</Boton>
		</div>
	</section>
{/if}

<style lang="scss">
	.consideraciones {
		ul {
			list-style-type: disc; /* Default bullet style */
			margin-left: 20px; /* Adjust indentation as needed */
			padding-left: 0; /* Ensure no extra padding */
		}

		li {
			margin-bottom: 5px; /* Add spacing between list items if desired */
		}
	}

	.botonera {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}
</style>
