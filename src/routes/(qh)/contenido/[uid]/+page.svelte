<script lang="ts">
	import * as prismicH from '@prismicio/helpers';
	export let data: any;
</script>

<section class="breacrumbs">
	<div class="container">
		<ul>
			<li>
				<a href="/">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
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

<section class="container">
	{@html prismicH.asHTML(data.document.data.contenido)}
</section>

<style lang="scss">
	section {
		margin-top: 30px;
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
