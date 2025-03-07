<script lang="ts">
	import { UserDefinedFunctionType } from '@azure/cosmos';
	import * as prismicH from '@prismicio/helpers';
	import { redirect } from '@sveltejs/kit';
	export let data: any;
</script>

<svelte:head>
	<title>Preguntas Frecuentes</title>
	<style>
		.prismic-content {
			padding-top: 30px;
			padding-bottom: 40px;
		}

		h1 {
			margin: 40px 0px 10px;
		}

		h2 {
			margin: 36px 0px 10px;
		}

		h5 {
			margin: 22px 0px 8px;
		}

		p {
			margin-bottom: 8px;
			width: unset;
		}

		a {
			display: block;
			color: #007bdb;
			text-decoration: underline;
		}
	</style>
</svelte:head>

<section class="breacrumbs">
	<div class="container">
		<ul>
			<li>
				<a href="/">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#D30ED1" />
					</svg>
				</a>
			</li>
			<li class="selected">
				<a href="/"> Inicio </a>
			</li>
			<li>></li>
			<li>{prismicH.asText(data.document.data.titulo)}</li>
		</ul>
	</div>
</section>

<section class="container prismic-content">
	{@html prismicH.asHTML(data.document.data.contenido)}
</section>

<style lang="scss">
	@use './static/style.scss' as mixin;
	section {
		margin-top: 30px;
	}

	.container {
		p {
			color: red !important;
		}
	}

	.breacrumbs {
		background: white;
		ul {
			padding: 24px 0px;
			display: flex;
			gap: 14px;
			li {
				font-weight: 500;
				font-size: 16px;
				line-height: 24px;
				&.selected {
					a {
						font-weight: 800;
						color: #d30ed1;
					}
				}
			}
		}
	}
</style>
