<script lang="ts">
	import Pin from '$lib/icons/Pin.svelte';

	export let evento: App.Evento;
</script>

<a href="/{evento.slug}">
	<div class="card">
		<div
			class="imagen"
			style="background:  url('{evento.banner.replaceAll(
				'maxitech/image/upload',
				'maxitech/image/upload/w_352,c_scale'
			)}') no-repeat center"
		/>
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
					<Pin />
					<span>Desde <strong>S/. 106 </strong> </span>
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
		background-color: #000;

		border-radius: 2rem;
		box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #f9f9f9, 0 0 0.8rem #f9f9f9,
			0 0 2.8rem #f9f9f9, inset 0 0 1.3rem #f9f9f9;

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
				line-height: initial;
				padding-top: 10px;
				span {
					color: red;
					font-weight: 400;
					font-size: 12px;
					color: #e4e6eb;
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
