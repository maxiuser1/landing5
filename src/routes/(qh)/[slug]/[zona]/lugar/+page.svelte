<script lang="ts">
	import { goto } from '$app/navigation';
	import { Boxlegend, Breadcrumbs, Resumen, Steps } from '$lib/components/Evento';
	import { clearCompradata, compraData } from '$lib/components/Evento/esto';
	import { Arrow, Box, Deathbox, Escenario, Lanchor, Ranchor } from '$lib/icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { handlee } from '$lib/utils/errorer';
	import Cuadrado from '$lib/icons/Cuadrado.svelte';
	import Compras from '$lib/components/Evento/Compras.svelte';
	import Entradas from '$lib/components/Evento/Entradas.svelte';

	export let data;
	let asientos: any;
	let { evento, zona }: { evento: App.Evento; zona: App.Precio } = data;

	let filas: Array<App.Fila> = evento.precios?.find((t: App.Precio) => t.tipo == zona.tipo)?.filas ?? new Array<App.Fila>();
	const esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';

	const sitWidth = 24;
	const filaWidth = 100;

	onMount(() => {
		compraData.subscribe((value) => {
			const entradasZona = value.entradas.find((t) => t.tipo == zona.tipo);
			if (entradasZona) {
				for (let i = 0; i < filas.length; i++) {
					for (let j = 0; j < filas[i].sits.length; j++) {
						const aer = entradasZona.lugares.filter((t) => t.fila == filas[i].id && t.sit == filas[i].sits[j].id);
						if (aer.length > 0) {
							filas[i].sits[j].s = 1;
						} else {
							filas[i].sits[j].s = -1;
						}
					}
				}
			}
		});
	});

	function letrar(indice: number) {
		try {
			const lasLetras = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
			return lasLetras.at(indice);
		} catch (err) {
			handlee(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	}

	const continuarClick = () => {
		let lugares: Array<App.Lugareado> = new Array<App.Lugareado>();
		filas.forEach((fila) => {
			fila.sits.forEach((sit) => {
				if (sit.s == 1) {
					lugares.push({
						fila: fila.id,
						sit: sit.id
					});
				}
			});
		});

		compraData.update((current) => ({
			...current,
			entradas: current.entradas.map((t) => {
				if (t.tipo == zona.tipo) {
					return {
						...t,
						cantidad: lugares.length,
						total: lugares.length * t.precio,
						lugares: lugares
					};
				} else return t;
			})
		}));

		goto(`../`);
	};
</script>

<section class="container">
	<div class="principal">
		<div class="steps">
			<Steps paso={2} {zona} />
		</div>

		<div class="lugar">
			<div class="titulos">
				<h4>Lugar</h4>
				<p>Selecciona el asiento y luego continua el proceso</p>
			</div>

			<div class="mapa">
				<div class="scenario">
					<Escenario />
				</div>
				<div class="asientos" bind:this={asientos} style:width="{filaWidth} px">
					{#each filas as fila, i}
						<ul class="fila">
							<li class="letra">
								{letrar(fila.id)}
							</li>
							{#each fila.sits as asiento, j}
								<li style:min-width="{sitWidth}px">
									{#if asiento.s != 0}
										<Cuadrado
											disabled={asiento.s >= 2}
											numero={asiento.id}
											tomado={asiento.s == 1}
											on:clickeado={(e) => {
												if (asiento.s == 1 || asiento.s == -1) {
													asiento.s = e.detail.state ? 1 : -1;
												}
											}}
										/>
									{/if}
								</li>
							{/each}
							<li class="letra">
								{letrar(fila.id)}
							</li>
						</ul>
					{/each}
				</div>
			</div>
		</div>
		<div class="lugar">
			<Compras />
		</div>
	</div>
	<div class="detalles">
		<Resumen {evento} />
		<button on:click|once={continuarClick} class="btn">Reservar lugares <Arrow /> </button>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.scenario {
		text-align: center;
	}

	.letra {
		font-size: 12px;
		font-weight: 900;
	}

	.mapa {
		@include breakpoint($md) {
			margin-left: initial;
		}
	}
	.asientos {
		padding-top: 30px;
		width: 99%;
		overflow-x: auto;
		max-width: 300px;
		.fila {
			display: flex;
			flex-wrap: nowrap;
			gap: 4px;
			padding-bottom: 10px;
		}

		@include breakpoint($md) {
			max-width: initial;
		}
	}

	.steps {
		padding: 40px 16px 32px;
	}

	.consideraciones {
		padding-left: 20px;
	}
	.letra {
		font-size: 12px;
		font-weight: 900;
	}

	ol {
		li {
			margin-bottom: 10px;
		}
	}

	.lugar {
		border-radius: 8px;
		background: #f9f9f9;

		margin-bottom: 20px;
		padding: 40px 32px;
		h4 {
			font-weight: 100;
			margin-bottom: 10px;
		}

		.titulos {
			margin-bottom: 32px;
		}

		@include breakpoint($md) {
			margin-right: 24px;
		}
	}

	.principal {
		@include breakpoint($md) {
			padding-right: 8px;
			min-height: 90vh;
		}
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include breakpoint($md) {
			grid-template-columns: 728px 352px;
		}
	}

	.detalles {
		padding: 40px 24px;
		min-width: 100%;
		border: 1px solid #fff;
		background: var(--White-White_98, #f9f9f9);
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

		.btn {
			width: 100%;
			margin-top: 40px;
			font-size: 16px;
			font-weight: 700;
		}
	}
</style>
