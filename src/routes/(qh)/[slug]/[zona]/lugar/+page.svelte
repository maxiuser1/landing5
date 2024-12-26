<script lang="ts">
	import { goto } from '$app/navigation';
	import { Boxlegend, Breadcrumbs, Resumen, Steps } from '$lib/components/Evento';
	import { clearCompradata, compraData } from '$lib/components/Evento/store';
	import { Arrow, Box, Deathbox, Escenario, Lanchor, Ranchor } from '$lib/icons';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { handlee } from '$lib/utils/errorer';

	export let data;
	let asientos: any;
	let { evento, zona }: { evento: App.Evento; zona: App.Precio } = data;

	let filas: Array<App.Fila> = evento.precios?.find((t: App.Precio) => t.tipo == zona.tipo)?.filas ?? new Array<App.Fila>();
	const esPromotor = $page.data.user?.rol != undefined && $page.data.user?.rol == 'promotor';

	const sitWidth = 75;
	const filaWidth = 100;

	onMount(() => {
		clearCompradata();
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
		try {
			let entradas: Array<App.Sentado> = new Array<App.Sentado>();

			filas.forEach((fila) => {
				fila.sits.forEach((sit) => {
					if (sit.s == 1) {
						entradas.push({
							tipo: zona.tipo,
							nombre: zona.nombre,
							numerado: true,
							fila: fila.id,
							asiento: sit.id,
							cantidad: sit.l!,
							final: esPromotor ? zona.promotor : zona.online
						});
					}
				});
			});

			if (entradas.length == 0) {
				alert('Debe seleccionar algún lugar para poder continuar.');
				return;
			}

			compraData.update((current) => ({
				...current,
				zona: { tipo: zona.tipo },
				entradas: entradas
			}));

			esPromotor ? goto(`./venta`) : goto(`./reserva${$page.url.search ?? ''}`);
		} catch (err) {
			handlee(JSON.stringify(err, Object.getOwnPropertyNames(err)));
		}
	};
</script>

<div class="pagina">
	<img style="width: 100%;" class="img" src={evento?.caratula?.banner} alt="banner" />
	<section class="container zonas">
		<div style="padding:24px">
			<div class="tabs">
				<ul>
					<li class="active">Elije tu zona</li>
					<li>Resumen</li>
					<li>Compra</li>
				</ul>
			</div>
		</div>
	</section>
	<section class="container">
		<div class="principal">
			<div class="lugar">
				<div class="titulos">
					<h4>Box</h4>
					<p>Selecciona el asiento y luego continua el proceso</p>
				</div>

				<div class="mapa">
					<div class="scenario" style="width: 315px; margin:0 auto;">
						<Escenario />
					</div>
					<div class="asientos" bind:this={asientos} style:width="{filaWidth} px">
						{#each filas as fila}
							<ul class="fila">
								<li>
									{letrar(fila.id)}
								</li>
								{#each fila.sits as asiento}
									<li style:min-width="{sitWidth}px">
										{#if asiento.s != 0}
											<Box
												disabled={asiento.s >= 2}
												width={sitWidth}
												tomados={asiento.c ?? 0}
												limite={asiento.l ?? 10}
												on:clickeado={(e) => {
													if (asiento.s == 1 || asiento.s == -1) {
														asiento.s = e.detail.state ? 1 : -1;
													}
												}}
											/>
										{/if}
									</li>
								{/each}
								<li>
									{letrar(fila.id)}
								</li>
							</ul>
						{/each}
					</div>
				</div>
				<!-- <div class="scrollers">
					<div>
						<button
							class="scroller"
							type="button"
							on:click={() => {
								asientos.style.scrollBehavior = 'smooth';
								asientos.scrollLeft -= 40;
							}}
						>
							<Lanchor />
						</button>
						<button
							class="scroller"
							type="button"
							on:click={() => {
								asientos.style.scrollBehavior = 'smooth';
								asientos.scrollLeft += 40;
							}}
						>
							<Ranchor />
						</button>
					</div>
				</div> -->

				{#if filas.some((fila) => fila.sits.some((sit) => sit.s == 1))}
					<div class="legend">
						<div class="box">
							{#each filas as fila}
								{#each fila.sits as asiento}
									{#if asiento.s == 1}
										<div class="line">
											<Deathbox disabled={false} width={60} tomado={true} />
											<div>
												<strong>{`${letrar(fila.id)} ${asiento.id}`}</strong>
											</div>
										</div>
									{/if}
								{/each}
							{/each}
						</div>
					</div>
				{/if}
			</div>
			<button on:click|once={continuarClick} class="btn">Continuar <Arrow /> </button>
		</div>
		<!-- <div class="detalles">
			<Resumen {evento} />
			<button on:click|once={continuarClick} class="btn">Continuar <Arrow /> </button>
		</div> -->
	</section>
</div>

<style lang="scss">
	@import './static/style.scss';

	.tabs {
		background-color: #ededed;
		border-radius: 60px;
		padding: 8px;
		margin-bottom: 35px;

		ul {
			display: flex;
			gap: 10px;
			li {
				display: block;
				border-radius: 60px;
				padding: 10px;
				color: #000;
			}

			.active {
				display: block;
				border-radius: 60px;
				padding: 10px;
				background-color: #e700d8;
				color: #ffffff;
			}
		}
	}

	.pagina {
		background: #000;
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
		.fila {
			display: flex;
			flex-wrap: nowrap;
			gap: 10px;
			padding-bottom: 10px;
		}
	}

	.lugar {
		border-radius: 8px;
		background: #f9f9f9;
		padding: 40px 32px;
		margin-right: 24px;

		h4 {
			font-weight: 100;
			margin-bottom: 10px;
		}

		.titulos {
			margin-bottom: 32px;
		}
	}

	.principal {
		min-height: 90vh;
	}

	.btn {
		width: 100%;
		margin-top: 40px;
		margin-bottom: 24px;
		border-radius: 50px;
		font-size: 16px;
		font-weight: 700;
	}

	.detalles {
		padding: 40px 24px;
		min-width: 100%;
		border: 1px solid #fff;
		background: var(--White-White_98, #f9f9f9);
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
	}
</style>
