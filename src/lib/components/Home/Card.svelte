<script lang="ts">
	import Dolar from '$lib/icons/Dolar.svelte';
	import * as prismicH from '@prismicio/helpers';
	import Pin from '$lib/icons/Pin.svelte';

	export let evento: App.Evento;
</script>

<a href="/{evento.slug}">
	<div class="card">
		<div class="imagen" style="background-image: url('{evento.card}'); background-position: center top;background-size: 100% 100%;" />
		<div class="content">
			<div class="info">
				<div class="encabezado">
					<div class="h2 titulo--suprayado">
						{evento.artista}
					</div>
				</div>
				<div class="h3">
					{@html evento.nombre}
				</div>
				<div class="h3">
					<div class="fechas">
						{#each evento.fechas as fecha}
							<h4>{fecha}</h4>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	@import './static/style.scss';

	a {
		z-index: 2;
	}
	.card {
		width: 342px;
		border-radius: 0.5rem;
		border: 1px solid #f1f1f1;
		background: #f9f9f9;

		@include breakpoint($md) {
			width: 24.8rem;
		}
	}

	.content {
		padding: 19px;
		display: flex;
		justify-content: space-between;

		.info {
			.h2 {
				font-weight: 900;
				font-size: 18px;
				line-height: 22px;
				color: #3b3b3b;

				span {
					font-weight: 500;
					font-size: 12px;
					line-height: 14px;
					color: #e4e6eb;
				}
			}

			.h3 {
				color: var(--Black-Black_25, #3b3b3b);
				font-family: Gotham;
				font-size: 0.875rem;
				font-style: normal;
				font-weight: 350;
				line-height: 1.125rem;
			}
		}

		.fechas {
			h4 {
				color: #3b3b3b;
				font-family: Gotham;
				font-size: 0.75rem;
				font-style: normal;
				font-weight: 350;
				line-height: 0.875rem;
			}
		}
	}

	.imagen {
		height: 11.375rem;
		transition: all 0.3s ease-in-out;

		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;

		&:hover {
			background-size: 120% 120% !important;
		}
	}
</style>
