<script lang="ts">
	import { goto } from '$app/navigation';
	import { Entradas, Info } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { page } from '$app/stores';

	export let data;
	let { evento } = data;

	const comprarClick = () => {
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

		if ($page.data?.user?.nombre?.length > 0) {
			goto(`${evento.general?.slug}/entradas`);
		} else {
			goto('./login');
		}
	};
</script>

<svelte:head>
	<title>{evento.general?.slug}</title>
</svelte:head>

{#if evento.caratula.portada}
	<section class="container portada">
		<img src={evento.caratula.portada} alt="portada" on:click|once={comprarClick} />
	</section>
	<section class="container cta">
		<button on:click|once={comprarClick} class="comprar">Ir a comprar </button>
	</section>
{:else}
	<section class="banner" style:background-image="url('{evento.caratula?.banner}')">
		<div class="content-banner">
			<div class="titulos" />
		</div>
	</section>
	<Info {evento} />
	<Entradas {evento} />
	<section class="container cta">
		<button on:click|once={comprarClick} class="comprar">Ir a comprar </button>
	</section>
{/if}

<style lang="scss">
	.portada {
		img {
			width: 100%;
			height: auto;
		}
	}
	.cta {
		margin-top: 52px;
		margin-bottom: 60px;
	}
	.comprar {
		padding: 22px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
		border: none;
		color: white;
		width: 100%;
	}
	.content-banner {
		width: 100%;
	}
	.banner {
		background: #000;
		background-size: contain; /* <------ */
		background-repeat: no-repeat;
		background-position: center center;
		height: 160px;

		display: flex;
		align-items: flex-end;

		@include breakpoint($md) {
			height: 440px;
		}

		.titulos {
			padding: 0 0 10px 24px;

			color: #ffffff;

			@include breakpoint($md) {
				padding: 0 0 32px 88px;
			}
		}
	}
</style>
