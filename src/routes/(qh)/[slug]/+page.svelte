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
				artista: evento.general?.artista
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

<section class="banner" style:background-image="url('{evento.caratula?.banner}')">
	<div class="content-banner">
		<div class="titulos">
			<h2>{evento.general?.artista}</h2>
		</div>
	</div>
</section>
<Info {evento} />
<Entradas {evento} />
<section class="container cta">
	<button on:click|once={comprarClick} class="comprar">Ir a comprar </button>
</section>

<style lang="scss">
	.cta {
		margin-top: 52px;
		margin-bottom: 60px;
	}
	.comprar {
		padding: 12px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
		border: none;
		color: white;
	}
	.content-banner {
		width: 100%;
	}
	.banner {
		background-size: 100% 100%; /* <------ */
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

			h1 {
				font-weight: 700;
				font-size: 32px;
				line-height: 38px;

				@include breakpoint($md) {
					font-size: 42px;
					line-height: 50px;
				}
			}

			h2 {
				font-weight: 400;
				font-size: 24px;
				line-height: 29px;

				@include breakpoint($md) {
					font-size: 32px;
					line-height: 38px;
				}
			}
		}
	}
</style>
