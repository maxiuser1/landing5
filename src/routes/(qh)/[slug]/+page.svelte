<script lang="ts">
	import { Entradas, Info } from '$lib/components/Evento';
	import { page } from '$app/stores';

	export let data;
	let { evento } = data;
	const urlZonas = `${evento.general?.slug}/zonas${$page.url.search ?? ''}`;
	const urlLogin = `./login?redirectTo=${encodeURIComponent($page.url.href)}`;
	// let redirectUrl = $page.data?.user?.nombre?.length > 0 ? urlZonas : urlLogin;
	let redirectUrl = urlZonas;
</script>

<svelte:head>
	<title>{evento.general?.nombre}</title>
</svelte:head>

{#if evento.caratula.portada}
	<section class="portada">
		<a href={redirectUrl}>
			<img width="100%" src="https://mlhmwdnd0t7t.i.optimole.com/co-ZpyQ-I3ijXCmY/w:auto/h:auto/q:auto/id:333ffed4d9c9f89f751deb234a0b46f9/directUpload/land.jpg" alt="portada" />
		</a>
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
		<a class="comprar" href={redirectUrl}>Comprar</a>
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';
	.portada {
		img {
			width: 100%;
			height: auto;
		}
	}
	.cta {
		margin-top: 52px;
		margin-bottom: 60px;
		width: 100%;
	}
	.comprar {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 22px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
		border: none;
		font-size: 32px;
		color: white;
		width: 100%;
		min-width: 100%;
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
