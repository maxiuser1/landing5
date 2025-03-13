<script lang="ts">
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	let { reserva, pagar, loading } = $props();
</script>

{#if reserva.tab == 'pago'}
	<section class="minicontainer">
		<h4>Pago</h4>
		<p>Confirmar compra</p>
		<div class="botonera mt-40">
			<button class="btn--outline" onclick={() => (reserva.tab = 'comercios')}>Volver</button>
			<Boton onclick={pagar} {loading}>Pagar</Boton>
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
