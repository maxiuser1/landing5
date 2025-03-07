<script lang="ts">
	import { Entradas, Info } from '$lib/components/Evento';
	import { page } from '$app/stores';
	import Entrada from '$lib/components/Evento/Entrada.svelte';

	export let data;
	let { evento } = data;
	const urlZonas = `/${evento.id}/zonas${$page.url.search ?? ''}`;
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
			<img width="100%" src={evento.caratula.portada} alt="portada" />
		</a>
		<br />
		<div style="display:flex; justify-content: center; padding-bottom: 24px;">
			<a href={redirectUrl} class="btn"> Continuar </a>
		</div>
	</section>
{:else}
	<section class="banner" style:background-image="url('{evento.caratula?.banner}')">
		<div class="content-banner">
			<div class="titulos" />
		</div>
	</section>

	<Entrada {evento} />
{/if}

<style lang="scss">
	@use './static/style.scss' as mixin;
	.btn {
		width: 90vw;
		display: block;
		text-align: center;
		border-radius: 50px;
	}

	.portada {
		background-color: #000;
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

		@include mixin.breakpoint(mixin.$md) {
			height: 420px;
		}

		.titulos {
			padding: 0 0 10px 24px;

			color: #ffffff;

			@include mixin.breakpoint(mixin.$md) {
				padding: 0 0 32px 88px;
			}
		}
	}
</style>
