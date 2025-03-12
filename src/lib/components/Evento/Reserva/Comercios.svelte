<script lang="ts">
	import { Arrow } from '$lib/icons';
	import Comercio from './Comercio.svelte';

	let { reserva, comercios } = $props();
</script>

{#if reserva.tab == 'comercios'}
	<section class="minicontainer">
		<h4>Acompañamiento</h4>
		<p>Puedes acompañar tu entrada con algo mas</p>

		<div class="tablist mt-20">
			{#each comercios as comercio}
				<button
					onclick={() => (reserva.comercio = comercio.id)}
					class="btn--lessline"
					class:btn--outline={comercio.id == reserva.comercio}>{comercio.tipo}</button
				>
			{/each}
		</div>

		{#each comercios as comercio}
			{#if comercio.id == reserva.comercio}
				<Comercio {reserva} {comercio} />
			{/if}
		{/each}

		<div class="botonera mt-40">
			<button class="btn--outline" onclick={() => (reserva.tab = 'inicio')}>Volver</button>
			<button class="btn" onclick={() => (reserva.tab = 'pago')}>Continuar <Arrow /></button>
		</div>
	</section>
{/if}

<style lang="scss">
	.btn--outline {
		border-bottom: 1px solid #d30ed1;
	}

	.tablist {
		display: flex;
		justify-content: center;
		gap: 8px;
	}

	.botonera {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}
</style>
