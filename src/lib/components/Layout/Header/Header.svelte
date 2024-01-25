<script lang="ts">
	import { page } from '$app/stores';
	import { Lupa, User } from '$lib/icons';
	import { slide } from 'svelte/transition';
	import Logo from './Logo.svelte';
	import Nav from './Nav.svelte';
	import Socials from './Socials.svelte';
	import Har from './Har.svelte';
	import Bogo from './Bogo.svelte';

	let visible = false;

	const toggle = () => {
		visible = !visible;
	};
</script>

<Har />
<div class="container">
	<div class="logo">
		<Bogo />
	</div>
	<div class="searchbox">
		<div class="box">
			<input type="search" class="input" placeholder="Encuentra tu evento" />
			<div class="boton">
				<Lupa />
			</div>
		</div>
	</div>
	<div class="hamburger">
		<Nav on:togglemenu={toggle} />
	</div>
</div>

{#if visible}
	<header class="categories" transition:slide>
		<nav class="container">
			<ul class="ingresa menu">
				<li>
					{#if $page.data.user}
						<div class="circle"><User /> <span class="anchormenu">{$page.data.user.nombre} {$page.data.user.apellido}</span></div>
						<div />
					{:else}
						<a class="anchormenu" href="./login"> Ingresa</a>
					{/if}
				</li>
				{#if $page.data.user}
					<li>
						<a href="https://quehay.pe/entradas">Mis entradas</a>
					</li>
					<li>
						<a class="anchormenu" href="../../logout"> Salir</a>
					</li>
				{/if}
			</ul>
			<ul class="menu">
				<li class:active={$page.url.hash.includes('destacados')}>
					<a href="#destacados">Destacados</a>
				</li>
				<li class:active={$page.url.hash.includes('conciertos')}>
					<a href="#conciertos"> Festivales</a>
				</li>
			</ul>
		</nav>
	</header>
{/if}

<style lang="scss">
	@import './static/style.scss';
	.anchormenu {
		color: #fff;
	}

	.logo {
		flex: 1;
	}

	.hamburger {
		flex: 1;
		text-align: right;
	}

	.searchbox {
		flex: 2;
		padding-left: 24px;
		padding-right: 24px;
		text-align: center;
		margin-top: -12px;
		display: flex;
		justify-content: center;
		.box {
			width: 100%;
			height: 48px;

			display: flex;
			align-items: center;
			border: 1px solid #c6c6c6;

			justify-content: space-between;
			border-radius: 4px;
			background-color: #f1f1f1;

			@include breakpoint($md) {
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
	}

	.container {
		padding-top: 20px;
		padding-bottom: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		top: 7rem;
		left: 0;
		background-color: #5b025a;

		@include breakpoint($md) {
			width: 100%;
			height: initial;
		}

		nav {
			margin: 0 auto;
			padding-left: 24px;

			@include breakpoint($md) {
				padding-left: initial;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			ul.ingresa {
				margin-top: 35px;
				padding-bottom: 35px;
				border-bottom: 1px solid #80057f;
				li {
					color: white;
					font-weight: 500;
					display: flex;
					align-items: center;
					font-size: 14px;
					line-height: 18px;
					gap: 10px;
				}
				@include breakpoint($md) {
					display: none !important;
				}
			}
			ul.menu {
				margin-top: 32px;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 32px;

				@include breakpoint($md) {
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
						@include breakpoint($md) {
							padding: 20px;
							background-color: #80057f;
						}
					}
				}
			}
		}
	}
</style>
