<script lang="ts">
	export let evento: App.Evento;
	const artista = (evento.general?.artista ?? '').length > 20 ? evento.general?.artista.substring(0, 19) + '..' : evento.general?.artista;
</script>

<section class="breacrumbs">
	<div class="container">
		<ul>
			<li>
				<a href="/{evento.general?.slug}">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#D30ED1" />
					</svg>
				</a>
			</li>
			<li class="selected">
				<a href="/{evento.general?.slug}">
					{artista}
				</a>
			</li>
			<li>></li>
			<li>Tienda</li>
		</ul>
	</div>
</section>

<style lang="scss">
	@use './static/style.scss' as mixin;
	.breacrumbs {
		background: white;
		ul {
			padding: 12px 0px;
			display: flex;
			gap: 14px;
			@include mixin.breakpoint(mixin.$md) {
				padding: 24px 0px;
			}

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
