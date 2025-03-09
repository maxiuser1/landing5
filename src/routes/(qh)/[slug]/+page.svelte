<script lang="ts">
	import { goto } from '$app/navigation';
	import Precios from '$lib/components/Evento/Portada/Precios.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';
	import { EventosRepo } from '$lib/repos/eventosRepo';
	import * as prismicH from '@prismicio/helpers';
	let { data } = $props();
	const { parrilla } = data;
	const { general, caratula } = data.evento;
	function volver() {
		goto('/');
	}
</script>

<Header {volver}>
	<ul class="socials" role="menu">
		<li role="none"><a role="menuitem" href="#inicio">Inicio</a></li>
		<li role="none"><a role="menuitem" href="#Precios">Precios</a></li>
		<li role="none"><a role="menuitem" href="#legal">Legal</a></li>
	</ul>
</Header>
<span
	style="--theme-principal: {caratula.colorPrincipal}; --theme-contraste: {caratula.colorContrastePrincipal}"
>
	<section id="inicio">
		<img class="portada" src={caratula.portada} alt="Portada" />
	</section>
	<section id="Precios" style="background-image:url({caratula.textura})">
		<div class="container legal">
			<div class="center-box">
				<Precios {parrilla} {caratula} />
				<div class="botonera">
					<a class="continuar" href="./{data.evento.id}/reserva">
						Regular <Ticket />
					</a>
				</div>
			</div>
		</div>
	</section>

	<section id="legal" style="background-image:url({data.evento.caratula.textura})">
		<div class="container legal">
			<div class="center-box">
				{@html prismicH.asHTML(data.document.data.legal)}
			</div>
		</div>
	</section>
</span>

<style lang="scss">
	@use '../../../../static/style.scss' as mixin;
	@forward '../../../../static/container.scss';

	.botonera {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.continuar {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 32px 24px;
		border-radius: 8px;
		min-width: 300px;
		background-color: var(--theme-contraste);
		color: var(--theme-principal);
		stroke: var(--theme-principal);

		&:hover {
			filter: brightness(85%);
		}
	}

	:global(strong) {
		color: var(--theme-contraste) !important;
	}

	section {
		color: var(--theme-principal);
	}

	.socials {
		display: flex;
		align-items: center;
		gap: 14px;
		li {
			a {
				color: white;
			}
		}
	}

	img {
		display: block;
		max-width: 100%;
		height: auto;
	}
	.portada {
		width: 100%;
		max-width: 100%;
	}

	.legal {
		display: flex;
		justify-content: center;
		.center-box {
			width: 100%;
			@include mixin.breakpoint(mixin.$md) {
				margin: 50px 0;
				width: 50%;
			}
		}
	}
</style>
