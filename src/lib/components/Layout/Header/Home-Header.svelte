<script lang="ts">
	import { Lupa, User } from '$lib/icons';
	import Bogo from './Bogo.svelte';
	import Nav from './Nav.svelte';
	import Sup from './Sup.svelte';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';

	let { eventos } = $props();
	let visible = $state(false);
	let inputph = $state('Encuentra tu evento');
	let eventosResult = $state<App.HomeEvento[]>([]);
	let active_class = $state('searchbox');
	const toggle = () => {
		visible = !visible;
	};

	const handleInputer = () => {
		inputph = '';
		active_class = 'searchbox searchbox-focus';
	};

	const handleOutInputer = () => {
		inputph = 'Encuentra tu evento';
		active_class = 'searchbox';
		eventosResult = [];
	};

	const oninput = (e: any) => {
		const value = e.target.value;
		if (value.length > 0) {
			eventosResult = eventos;
			active_class = 'searchbox searchbox-focus searchbox-searching';
			eventosResult = eventos
				.filter(
					(evento: App.HomeEvento) =>
						evento.nombre.toLowerCase().includes(value.toLowerCase()) ||
						evento.artista.toLowerCase().includes(value.toLowerCase()) ||
						evento.fechas.toLowerCase().includes(value.toLowerCase()) ||
						evento.lugar.toLowerCase().includes(value.toLowerCase())
				)
				.slice(0, 3);
		} else {
			eventosResult = [];
			active_class = 'searchbox searchbox-focus';
		}
		console.log('e', e.target.value, eventos);
	};
</script>

<Sup />
<div class="container superheader">
	<div class="logo">
		<Bogo />
	</div>
	<div class={active_class}>
		<div class="box">
			<input
				type="search"
				class="input"
				placeholder={inputph}
				onfocusin={handleInputer}
				onfocusout={handleOutInputer}
				oninput={(e) => oninput(e)}
			/>
			<div class="boton">
				<Lupa />
			</div>
		</div>
		{#if eventosResult.length > 0}
			<div class="results">
				{#each eventosResult as evento}
					<a href="/{evento.slug}" class="result">
						<div>
							<img src={evento.card} alt={evento.nombre} />
						</div>
						<div>
							<h5>{evento.nombre} - <small>{evento.artista}</small></h5>
							<p>{evento.fechas}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
	<div class="hamburger">
		<Nav toggleMenu={toggle} />
	</div>
</div>

{#if visible}
	<header class="categories" transition:slide>
		<nav class="container">
			<ul class="menu">
				<li class="anonimo">
					{#if page.data.user}
						<div class="circle">
							<User />
							<span class="anchormenu">{page.data.user.nombre} {page.data.user.apellido}</span>
						</div>
						<div></div>
					{:else}
						<a class="anchormenu" href="./login"> <b> Ingresa /</b></a>
						<a class="anchormenu" href="./registro"> <b> Regístrate</b></a>
					{/if}
				</li>
				{#if page.data.user}
					<li>
						<a href="https://quehay.pe/entradas">Mis entradas</a>
					</li>
					<li>
						<a class="anchormenu" href="../../logout"> Salir</a>
					</li>
				{/if}

				<li class:active={page.url.hash.includes('destacados')}>
					<a href="#destacados">Conciertos</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Teatro</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Deportes</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Festivales</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Arte y Cultura</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Niños</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Viajes y aventuras</a>
				</li>
				<li class:active={page.url.hash.includes('conciertos')}>
					<a href="#conciertos">Salud y bienestar</a>
				</li>
			</ul>
		</nav>
	</header>
{/if}

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
	@forward '../../../../../static/container.scss';

	.anonimo {
		display: initial;
		@include mixin.breakpoint(mixin.$md) {
			display: none;
		}
	}

	.anchormenu {
		color: #fff;
	}

	.logo {
		grid-area: logo;
		margin: 0 auto;

		@include mixin.breakpoint(mixin.$md) {
			margin: initial;
		}
	}

	.hamburger {
		grid-area: hb;
		text-align: right;
	}

	.searchbox {
		position: relative;
		grid-area: sb;
		padding-left: 24px;
		padding-right: 24px;
		text-align: center;
		margin-top: 24px;
		display: flex;
		flex-direction: column;
		justify-content: center;

		@include mixin.breakpoint(mixin.$md) {
			margin-top: -12px;
		}

		.results {
			position: absolute;
			top: 100%;
			z-index: 9999;
			width: 94%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.16);
			gap: 12px;
			padding: 12px;

			.result {
				text-align: left;
				background-color: #eeeeee;
				padding: 12px;
				border-radius: 8px;
				gap: 12px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;

				img {
					width: 100px;
					height: 60px;
				}
			}
		}

		.box {
			width: 100%;
			height: 48px;

			display: flex;
			align-items: center;
			border: 1px solid #c6c6c6;

			justify-content: space-between;
			border-radius: 4px;
			background-color: #f1f1f1;

			@include mixin.breakpoint(mixin.$md) {
				height: 56px;
			}
		}

		.input {
			padding-left: 16px;
			font-family: 'Gotham';
			line-height: 20px;
			width: 100%;
			border-color: transparent;
			outline-offset: -2px;
			background-color: #f1f1f1;

			font-size: 16px;
			&:focus {
				outline: none;
			}
		}

		.boton {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-right: 12px;
			gap: 8px;
			height: 40px;
			width: 56px;
			background: #d30ed1;
			border-radius: 4px;
		}

		&-focus {
			.box {
				border: 1px solid #d30ed1;
				background-color: #fff;
				box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
			}

			.input {
				background-color: #fff;
			}
		}

		&-searching {
			.box {
				border: none;
			}
		}
	}

	.superheader {
		margin-top: 0;
		padding-top: 20px;
		padding-bottom: 20px;
		grid-template-columns: repeat(9, 1fr);
		display: grid;
		grid-template-areas:
			'hb logo logo logo logo logo logo logo logo '
			'sb sb sb sb sb sb sb sb sb';
		padding-left: 0px;
		padding-right: 0px;

		@include mixin.breakpoint(mixin.$md) {
			margin-top: 2.75rem;
			grid-template-areas: 'logo logo sb sb sb sb sb sb hb';
		}
	}

	nav {
		margin: 0 auto;
		height: var(--header-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.categories {
		width: 304px;
		position: fixed;
		height: 100vh;
		z-index: 5;
		top: 100px;
		left: 0;
		background-color: #5b025a;

		@include mixin.breakpoint(mixin.$md) {
			top: 7rem;
			width: 100%;
			height: initial;
		}

		nav {
			margin: 0 auto;
			padding-left: 24px;

			@include mixin.breakpoint(mixin.$md) {
				padding-left: initial;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			ul.menu {
				margin-top: 432px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 32px;

				@include mixin.breakpoint(mixin.$md) {
					margin-top: initial;
					flex-direction: row;
					align-items: center;
				}

				li {
					a {
						color: white;
						font-weight: 500;
						font-size: 14px;
						line-height: 18px;
					}

					&.active {
						@include mixin.breakpoint(mixin.$md) {
							padding: 20px;
							background-color: #80057f;
						}
					}
				}
			}
		}
	}
</style>
