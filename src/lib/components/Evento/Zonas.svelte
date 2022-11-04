<script type="ts">
	import { zonas } from './zonas';
	import { compraData } from './store';
	import { goto } from '$app/navigation';
	import { Radio } from '$lib/icons';
	import { Soles } from '$lib/utils/formats';

	export let evento: App.Evento;

	const seleccionar = (zonaSeleccionada: any) => {
		compraData.update((current) => ({
			...current,
			zona: {
				tipo: zonaSeleccionada.tipo,
				nombre: zonaSeleccionada.nombre,
				base: zonaSeleccionada.base,
				numerado: zonaSeleccionada.numerado
			}
		}));

		if (zonaSeleccionada.numerado) {
			goto(`../${evento.general?.slug}/lugar`);
		} else {
			goto(`../${evento.general?.slug}/reserva`);
		}
	};
</script>

<section class="container entrada">
	<div class="grid">
		<div class="main">
			<div class="titulos">
				<h2>Entrada</h2>
				<h3>Selecciona en que sector deseas adquirir y luego continua el proceso</h3>
			</div>
			<div
				class="mapa"
				use:zonas={evento.precios}
				on:zonned={({ detail }) => {
					seleccionar(detail);
				}}
			>
				{@html evento.locacion}
			</div>
			<div class="leyenda">
				<div>
					{#if evento.precios}
					<table>
					
						<tbody>
							{#if evento.precios}
								{#each evento.precios as precio, idx}
									<tr class:white={idx % 2 == 0}>
										<td class="radio">
											<div class="radio">
												<Radio color={precio.color ? precio.color : ''} />
											</div>
										</td>
										<td class="tdnombre">{precio.nombre}
										</td>
										<td class="tdprecio"><Soles number={precio.base} /></td>
										
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
					{/if}
				</div>
			</div>
		</div>
		<div class="summary">
			<div class="headings">
				<h2>Detalle</h2>
				<h1>{evento.general?.artista}</h1>
				<h3>{evento.general?.nombre}</h3>
			</div>

			<h4>
				{#each evento.fechas as fecha}
					{new Date(fecha.dia).toLocaleDateString()}
				{/each}
			</h4>
			<h5>{evento.ubicacion?.nombre}</h5>
		</div>
	</div>
</section>

<style lang="scss">
	.leyenda {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tdnombre {
		min-width: 100px;
	}

	.tdprecio {
		min-width: 100px;
		text-align: right;
	}

	.container {
		padding-right: 0px;
		padding-left: 0px;
		@include breakpoint($md) {
			padding-right: 24px;
			padding-left: 24px;
		}
	}

	.cta {
		text-align: center;
		margin-top: 52px;
		margin-bottom: 60px;
		.comprar {
			padding: 12px 16px;
			background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
			border-radius: 4px;
			border: none;
			color: white;
		}
	}
	.entrada {
		margin-bottom: 50px;

		.mapa {
			width: 100%;

			@include breakpoint($md) {
				margin: 20px 0px;
			}
			.zona {
				border-radius: 4px;
				margin: 0 auto;
				text-align: center;

				svg:hover rect {
					fill: url('#myGradient');
				}
			}
		}

		.grid {
			display: flex;
			flex-direction: column;
			@include breakpoint($md) {
				flex-direction: row;
			}

			h2 {
				font-weight: 700;
				font-size: 24px;
				line-height: 29px;
				color: #000000;
				margin-bottom: 8px;
			}

			h3 {
				font-weight: 400;
				font-size: 16px;
				line-height: 16px;
				color: #1b1b1b;
			}

			.main {
				padding: 0px;
				flex-grow: 2;

				background-color: white;
				border-radius: 8px;

				.titulos {
					padding: 40px;
					@include breakpoint($md) {
						padding: 0px;
					}
				}

				@include breakpoint($md) {
					padding: 40px;
				}
			}

			.summary {
				flex-grow: 1;
				padding: 40px;
				background-color: white;
				border-radius: 8px;
			}
		}
	}

	.summary {
		.headings {
			padding-bottom: 16px;
			margin-bottom: 16px;
			border-bottom: 1px solid #e2e2e2;
		}

		h5 {
			font-weight: 400;
			font-size: 14px;
			line-height: 17px;
			color: #1b1b1b;
		}

		h4 {
			font-weight: 500;
			font-size: 16px;
			line-height: 16px;
			color: #1b1b1b;
			margin-bottom: 8px;
		}
		h1 {
			font-weight: 700;
			font-size: 32px;
			line-height: 38px;
			color: #262626;
		}
		h2 {
			font-weight: 700;
			font-size: 24px;
			line-height: 29px;
			color: #000000;
		}

		h3 {
			font-weight: 400;
			font-size: 20px;
			line-height: 24px;
			color: #262626;
		}
	}
</style>
