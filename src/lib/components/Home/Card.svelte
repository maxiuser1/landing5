<script lang="ts">
	import Dolar from '$lib/icons/Dolar.svelte';
	import * as prismicH from '@prismicio/helpers';
	import Pin from '$lib/icons/Pin.svelte';
	import Fecha from '$lib/icons/Fecha.svelte';

	export let evento: App.Evento;
</script>

<a href="/{evento.slug}">
	<div class="card">
		<div class="imagen" style="background-image: url('{evento.card}'); background-position: center top;background-size: 100% 100%;" />
		<div class="content">
			<div class="info">
				<div class="encabezado">
					<div class="titulo--suprayado">
						{evento.artista}
					</div>
				</div>
				<div class="h3">
					{@html evento.nombre}
				</div>
				<div class="h3">
					<div class="fechas">
						{#each evento.fechas as fecha}
							<div class="date-info">
								<Fecha />
								<h4>{fecha}</h4>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	@import './static/style.scss';

	.date-info {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 0.38rem;
	}
	.titulo--suprayado {
		font-size: 1rem;
	}

	a {
		z-index: 2;
	}
	.card {
		width: 398px;
		border-radius: 0.5rem;
		border: 1px solid #f1f1f1;
		background: #f9f9f9;

		@include breakpoint($md) {
			width: 24.8rem;
		}

		&:hover {
			background-color: #fff;
			box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.24);
		}
	}

	.content {
		display: flex;
		justify-content: space-between;

		.info {
			padding: 1.45rem 1rem;
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
				color: #3b3b3b;
				font-size: 0.875rem;
				font-style: normal;
				font-weight: 700;
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
	}
</style>
