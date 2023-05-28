<script lang="ts">
	import { page } from '$app/stores';
	import { User } from '$lib/icons';
	import { slide } from 'svelte/transition';
	import Logo from './Logo.svelte';
	import Nav from './Nav.svelte';
	import Socials from './Socials.svelte';

	let visible = false;

	const toggle = () => {
		visible = !visible;
	};
</script>

<header class="header">
	<nav class="container">
		<Socials on:togglemenu={toggle} closable={visible} />
		<Logo />
		<Nav on:togglemenu={toggle} closable={visible} />
	</nav>
</header>
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

	.header {
		width: 100%;
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		background: linear-gradient(270deg, var(--red) 0%, var(--pink) 100%);

		nav {
			margin: 0 auto;
			height: var(--header-height);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.categories {
		width: 304px;
		position: fixed;
		height: 100vh;
		z-index: 5;
		top: var(--header-height);
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
