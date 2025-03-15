<script lang="ts">
	import { goto } from '$app/navigation';
	import Contador from '$lib/components/Evento/Reserva/Contador.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { soles } from '$lib/shared/formatos.js';
	import { MarketplaceState } from './marketplace.svelte.js';

	let { data } = $props();
	let { reventas } = data;
	const marketplaceState = new MarketplaceState(reventas);

	const volver = () => {
		goto('/');
	};
</script>

<Header {volver} />

<div class="minicontainer mt-40">
	<h1>Marketplace</h1>

	<div class="fila mt-40">
		<div>Evento</div>
		<div></div>
		<div></div>
		<div></div>
	</div>
	<div class="filas">
		{#each marketplaceState.compras as reventa}
			<div class="fila">
				<div>
					<h5>{reventa.oferta.slug}</h5>
					<h6>
						{reventa.oferta.compraId}
					</h6>
				</div>
				<div>
					{reventa.oferta.cantidad} entradas <br />
					{soles(reventa.oferta.precio)} c/u
				</div>
				<div>
					<Contador
						cantidad={reventa.compra.cantidad}
						inc={() => reventa.compra.cantidad++}
						dec={() => reventa.compra.cantidad--}
						disabledInc={reventa.compra.cantidad >= reventa.oferta.cantidad}
					/>
					<div class="derecha mt-20">
						{soles(reventa.compra.cantidad * reventa.oferta.precio)}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.filas {
		display: flex;
		flex-direction: row;
		gap: 24px;

		.fila {
			background: #fff;
			padding: 24px;
		}
	}

	.fila {
		width: 100%;
		padding: 8px 24px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
</style>
