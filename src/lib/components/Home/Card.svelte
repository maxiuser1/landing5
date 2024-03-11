<script lang="ts">
	import Dolar from '$lib/icons/Dolar.svelte';
	import * as prismicH from '@prismicio/helpers';
	import Pin from '$lib/icons/Pin.svelte';
	import Fecha from '$lib/icons/Fecha.svelte';

	export let evento: App.Evento;
</script>

{#if evento.redireccion}
	<a href={evento.redireccion}>
		<div class="card">
			<div class="card-image">
				<img src={evento.card} alt="t" />
			</div>
			<div class="content">
				<div class="info">
					<div class="encabezado">
						<div class="titulo--suprayadoalt">
							<span class="elipsable">{evento.nombre}</span>
						</div>
					</div>
					<div class="h3">
						<span class="elipsable"> {@html evento.lugar}</span>
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
{:else}
	<a href="/{evento.slug}">
		<div class="card">
			<div class="card-image">
				<img src={evento.card} alt="t" />
			</div>
			<div class="content">
				<div class="info">
					<div class="encabezado">
						<div class="titulo--suprayado">
							<span class="elipsable">{evento.artista}</span>
						</div>
					</div>
					<div class="h3">
						<span class="elipsable"> {@html evento.nombre}</span>
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
{/if}

<style lang="scss">
	@import './static/style.scss';
	.elipsable {
		display: block;
		max-width: 380px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.date-info {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 0.38rem;
	}
	.titulo--suprayado {
		font-size: 1rem;
	}

	.titulo--suprayadoalt {
		font-size: 1rem;
	}

	a {
		z-index: 2;
	}

	.card-image {
		min-height: 182px;
		img {
			width: 100%;
			height: 182px;
		}
	}

	.card {
		max-width: 100dvw;
		width: 100dvw;
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid #f1f1f1;
		background: #f9f9f9;

		@include breakpoint($md) {
			width: 24.8rem;
			max-width: 24.8rem;
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
