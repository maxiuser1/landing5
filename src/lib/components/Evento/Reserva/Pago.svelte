<script lang="ts">
	import { Arrow } from '$lib/icons';

	let { reserva, pagar } = $props();
</script>

{#if reserva.tab == 'pago'}
	<section class="minicontainer">
		<h4>Pago</h4>
		<p>Confirmar compra</p>

		<div class="botonera mt-40">
			<button class="btn--outline" onclick={() => (reserva.tab = 'comercios')}>Volver</button>
			<button class="btn" onclick={pagar}>Pagar</button>
		</div>
	</section>
{/if}

<style lang="scss">
	.botonera {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}
</style>
