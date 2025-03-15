<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	import { soles } from '$lib/shared/formatos.js';
	import { MarketplaceState } from './marketplace.svelte.js';

	let { data } = $props();
	let { reventas } = data;
	let loading = $state(false);

	const marketplaceState = new MarketplaceState(reventas);

	const volver = () => {
		goto('./');
	};

	const pagar = async () => {
		loading = true;

		const total = marketplaceState.total;
		const compras = marketplaceState.compras.filter((reventa) => reventa.checked).map((reventa) => reventa.oferta);

		const payload = JSON.stringify({ total, slug: data.slug, compras });
		const resp = await fetch('/api/reventa', { method: 'POST', body: payload });
		const datapago = await resp.json();
		VisanetCheckout.configure({
			...datapago,
			complete: (params: any) => (loading = false),
			cancel: () => {
				loading = false;
			}
		});
		VisanetCheckout.open();
	};
</script>

<svelte:head>
	<script type="text/javascript" src={PUBLIC_NIUBIZ_LIBRE}></script>
</svelte:head>

<Header {volver} />

<div class="minicontainer mt-40">
	<h1>Marketplace</h1>

	<div class="fila mt-40">
		<div>Evento</div>
		<div></div>
		<div></div>
	</div>
	<div class="filas">
		{#each marketplaceState.compras as reventa}
			<div class="fila" class:fila--activo={reventa.checked}>
				<div class="flexed">
					<input type="checkbox" class="checkbox" bind:checked={reventa.checked} />
					<a href="/{reventa.oferta.slug}">
						{reventa.oferta.slug}
					</a>
				</div>
				<div>
					{reventa.oferta.compra?.codigo}
				</div>
				<div class="derecha">
					{soles(reventa.oferta.precio)}
				</div>
			</div>
		{/each}
	</div>

	<div class="fila">
		<div></div>
		<div></div>
		<div class="derecha">
			<h4>
				Total: {soles(marketplaceState.total)}
			</h4>
		</div>
	</div>
</div>

<div class="centrado mb-40">
	<Boton class="btn" onclick={pagar} {loading}>Pagar</Boton>
</div>

<style lang="scss">
	.checkbox {
		width: 25px;
		height: 25px;
		accent-color: fuchsia;
		cursor: pointer;
	}

	.filas {
		display: flex;
		flex-direction: column;
		gap: 24px;

		.fila {
			background: #fff;
			padding: 24px;
			border-radius: 8px;
			&--activo {
				border: 1px solid #d30ed1;
			}
		}
	}

	.fila {
		width: 100%;
		padding: 8px 24px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}
</style>
