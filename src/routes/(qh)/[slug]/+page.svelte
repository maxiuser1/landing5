<script lang="ts">
	import { Entradas, Info } from '$lib/components/Evento';
	import { page } from '$app/stores';
	import Entrada from '$lib/components/Evento/Entrada.svelte';
	import { clearCompradata, compraData } from '$lib/components/Evento/esto.js';
	import { Arrow } from '$lib/icons/index.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data;
	let { evento } = data;
	const urlZonas = `${evento.general?.slug}/zonas${$page.url.search ?? ''}`;
	const urlConsideracion = `${evento.general?.slug}/consideracion${$page.url.search ?? ''}`;
	const urlLogin = `./login?redirectTo=${encodeURIComponent($page.url.href)}`;
	let redirectUrl = $page.data?.user?.nombre?.length > 0 ? urlZonas : urlLogin;
	let redirectConsideracionUrl = $page.data?.user?.nombre?.length > 0 ? urlConsideracion : urlLogin;

	onMount(async () => {
		if ($compraData.evento?.id != evento.id) {
			console.log('reiniciara');
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
</script>

<svelte:head>
	<title>{evento.general?.nombre}</title>
</svelte:head>

{#if evento.caratula.portada}
	<section class="portada">
		<a href={redirectUrl}>
			<img width="100%" src={evento.caratula.portada} alt="portada" />
		</a>
	</section>
{:else}
	<section class="banner">
		<img src={evento.caratula?.banner} alt="banner" />
	</section>

	<Entrada {evento} />

	<section class="continuar">
		<a class="btn" href={redirectConsideracionUrl}>Continuar <Arrow /></a>
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';

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
		img {
			width: 100%;
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
</style>
