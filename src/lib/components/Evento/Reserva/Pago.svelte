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
					El código QR dinámico es un comprobante válido de tu compra, por lo que no será canjeado por una entrada tradicional en el
					punto de venta o boletería.
				</li>
			
				<li>Descárgalo al menos un día antes del evento.</li>
				<li>
					Con el código QR dinámico puedes acercarte directamente al evento presentándolo de manera virtual o puedes llevarlo
					impreso.
				</li>
				<li>
					Al elegir código QR dinámico, estas aceptando no divulgarlo, ni compartirlo con terceros, ya que esto podría afectar tu
					ingreso al evento.
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
