<script lang="ts">
	import { Fecha } from '$lib/icons';
	import More from '$lib/icons/More.svelte';
	let { evento, more } = $props();
</script>

<a href="/{evento.slug}">
	<div class="card">
		<div
			class="imagen"
			style="background-image: url('{evento.card}'); background-position: center top;background-size: 100% 100%;"
		></div>
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
						<div class="date-info">
							<Fecha />
							<h4>{evento.fechas}</h4>
						</div>
					</div>
				</div>
			</div>
			<div>
				<button
					class="btn--icon mt-20"
					onclick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						more();
					}}
				>
					<More />
				</button>
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	@use '../../../../static/style.scss' as mixin;

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
		max-width: 100%;
		width: 100%;
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid #f1f1f1;
		background: #f9f9f9;

		@include mixin.breakpoint(mixin.$md) {
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
