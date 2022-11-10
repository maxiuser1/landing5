<script lang="ts">
	import Dolar from '$lib/icons/Dolar.svelte';
	import Pin from '$lib/icons/Pin.svelte';

	export let evento: App.Evento;
</script>

<a href="/{evento.slug}">
	<div class="card">
		<div class="imagen" style="background:  url('{evento.banner.replaceAll('maxitech/image/upload', 'maxitech/image/upload/w_352,c_scale')}') no-repeat center top" />
		<div class="content">
			<div class="info">
				<div class="h2">
					{evento.artista} <span class="tour">{evento.nombre}</span>
				</div>
				<div class="h3">
					<Pin />
					<span> {evento.lugar} <strong>, {evento.ciudad}</strong> </span>
				</div>
				<div class="h3">
					<Dolar />
					Desde
					<span class="desde"> S/. {evento.desde} </span>
					<span class="descontado"> S/. {evento.descontado} </span>
				</div>
			</div>
			<div class="fechas">
				{#each evento.fechas as fecha}
					<h4>{fecha}</h4>
				{/each}
			</div>
		</div>
	</div>
</a>

<style lang="scss">
	a {
		z-index: 2;
	}
	.card {
		width: 342px;
		background-color: #310b6b;

		border-radius: 2rem;

		@include breakpoint($md) {
			width: 352px;
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
				color: #fff;

				span {
					font-weight: 500;
					font-size: 12px;
					line-height: 14px;
					color: #e4e6eb;
				}
			}

			.h3 {
				color: #e4e6eb;
				line-height: initial;
				font-weight: 400;
				font-size: 12px;
				padding-top: 10px;
				.desde {
					text-decoration: line-through;
				}

				.descontado {
					font-size: 14px;
				}
			}
		}

		.fechas {
			border-left: 1px solid #b9b9b9;
			padding-left: 16px;
			text-align: center;

			h4 {
				font-weight: 500;
				font-size: 12px;
				line-height: 18px;
				color: #e4e6eb;
			}
		}
	}

	.imagen {
		height: 100px;
		background-size: cover;
		background-repeat: no-repeat;

		border-top-left-radius: 2rem;
		border-top-right-radius: 2rem;
	}
</style>
