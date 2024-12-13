<script lang="ts">
	import { Entradas, Info } from '$lib/components/Evento';
	import { page } from '$app/stores';
	import Entrada from '$lib/components/Evento/Entrada.svelte';
	import { clearCompradata, compraData } from '$lib/components/Evento/esto.js';
	import { Arrow } from '$lib/icons/index.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	let { evento, esPromotor } = data;

	const urlZonas = `${evento.general?.slug}/zonas${$page.url.search ?? ''}`;
	const urlConsideracion = `${evento.general?.slug}/consideracion${$page.url.search ?? ''}`;
	const urlLogin = `./login?redirectTo=${encodeURIComponent($page.url.href)}`;
	let portadaClicked = false;
	let redirectUrl = $page.data?.user?.nombre?.length > 0 ? urlZonas : urlLogin;
	let redirectConsideracionUrl = $page.data?.user?.nombre?.length > 0 ? urlConsideracion : urlLogin;

	$: habilitado = evento.general.categoria == 'Tours' ? $compraData?.evento?.fecha && $compraData?.evento?.hora : true;

	onMount(async () => {
		if ($compraData.evento?.id != evento.id) {
			clearCompradata();
			compraData.update((current) => {
				return {
					...current,
					evento: {
						id: evento.id,
						slug: evento.general.slug,
						nombre: evento.general.nombre,
						artista: evento.general.artista,
						lugar: evento.ubicacion.nombre,
						fecha: evento.fechas[0].fecha
					},
					entradas: evento.precios.map((t: any) => {
						return {
							tipo: t.tipo,
							nombre: t.nombre,
							cantidad: 0,
							final: 0,
							total: 0,
							precio: t.onlinei,
							lugares: [],
							numerado: t.numerado ? true : false
						};
					}),
					total: 0
				};
			});
		}
	});

	function onPortadaClick() {
		portadaClicked = true;
	}
</script>

<svelte:head>
	<title>{evento.general?.nombre}</title>
</svelte:head>

{#if evento.caratula.portada && !portadaClicked}
	<section class="portada" on:click={onPortadaClick}>
		<img src={evento.caratula.portada} alt="portada" />
	</section>
{:else}
	<section class="banner">
		<div class="slide" style="background-image: url('{evento.caratula?.banner}'); background-position: center top;background-size: 100% 100%;">
			<div class="gradiente">
				<div class="titulos">
					<h1>{evento.general.nombre}</h1>
					<h4>{evento.general.artista}</h4>
					<h4>{evento.general.fechas}</h4>
					<h4>{evento.general.horario}</h4>
				</div>
			</div>
		</div>
	</section>

	{#if esPromotor}
		<section class="container" style="text-align: center;">
			<a class="btn" href="{evento.general.slug}/reporte">Reporte</a>
		</section>
	{/if}
	<Entrada {evento} />

	<section class="continuar">
		{#if habilitado}
			<a class="btn" href={redirectConsideracionUrl}>Continuar <Arrow /></a>
		{:else}
			<a class="btn btn--desabilitado" href="#">Continuar <Arrow /></a>
		{/if}
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';
	.titulos {
		position: absolute;
		z-index: 9;
		left: 10%;
		top: 50%;
		display: none;
		h4 {
			font-size: 18px;
			font-weight: normal;
		}

		h5 {
			font-size: 14px;
			font-weight: normal;
		}

		h1,
		h4,
		h5,
		h6 {
			color: white;
		}

		@include breakpoint($md) {
			display: block;
		}
	}
	.gradiente {
		position: absolute;
		width: 100%;
		top: 0;
		height: 100%;
		left: 0;
	}

	.slide {
		background-color: #1f0045;
		position: relative;
		background-repeat: no-repeat;
		min-height: 109px;
		max-height: 109px;

		@include breakpoint($sm) {
			min-height: 200px;
			max-height: 200px;
		}

		@include breakpoint($md) {
			min-height: 22.5rem;
			max-height: 22.5rem;
		}
	}

	.continuar {
		margin: 48px auto;
		height: 90px;
		padding-top: 40px;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		background: #f9f9f9;
		text-align: center;

		@include breakpoint($md) {
			max-width: 728px;
			width: 728px;
		}
	}

	.portada {
		cursor: pointer;
		background: #000;
		display: block;
		margin: 0 auto;
		text-align: center;
		img {
			height: auto;
		}
	}

	.banner {
		img {
			width: 100%;
			max-height: 358px;

			@include breakpoint($md) {
				max-height: 420px;
			}
		}

		@include breakpoint($md) {
			height: 420px;
		}
	}

	.gradiente {
		&::before {
			background-color: rgba(0, 0, 0, 0.55);
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
		}
	}
</style>
