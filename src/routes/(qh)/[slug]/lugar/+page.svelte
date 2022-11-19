<script lang="ts">
	import { goto } from '$app/navigation';
	import { Boxlegend, Breadcrumbs, Resumen, Steps } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { Arrow, Box, Deathbox, Escenario, Lanchor, Ranchor } from '$lib/icons';
	import { page } from '$app/stores';

	export let data;
	let asientos: any;
	let { evento } = data;
	let filas: Array<App.Fila> = evento.precios?.find((t: any) => t.tipo == $compraData.zona?.tipo)?.filas ?? new Array<App.Fila>();
	const sitWidth = 75;
	const filaWidth = 100;

	function letrar(indice: number) {
		const lasLetras = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		return lasLetras.at(indice);
	}

	const continuarClick = () => {
		let asientos: Array<App.Sentado> = new Array<App.Sentado>();

		filas.forEach((fila) => {
			fila.sits.forEach((a) => {
				if (a.s == 1) {
					asientos.push({
						tipo: $compraData.zona?.tipo,
						nombre: $compraData.zona?.nombre,
						base: $compraData.zona?.base,
						promotor: $compraData.zona?.promotor,
						online: $compraData.zona?.online,
						numerado: $compraData.zona?.numerado,
						fila: fila.id,
						asiento: a.id,
						cantidad: 1,
						tickets: [{ c: `${$compraData.zona?.tipo}_${fila.id}_${a.id}`, v: '' }]
					});
				}
			});
		});

		if (asientos.length == 0) {
			alert('Debe seleccionar algún lugar para poder continuar.');
			return;
		}

		compraData.update((current) => ({
			...current,
			entradas: asientos
		}));

		const esPromotor = $page.data.user.rol != undefined && $page.data.user.rol == 'promotor';

		esPromotor ? goto(`../${evento.general?.slug}/venta`) : goto(`../${evento.general?.slug}/reserva${$page.url.search ?? ''}`);
	};
</script>

<Breadcrumbs {evento} />
<Steps paso={2} />

<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Entradas</h4>
				<p>Selecciona tus lugares</p>
			</div>
			<div class="mapa">
				<div class="scenario">
					<Escenario width={200} />
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
											tomados={0}
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
			<div class="scrollers">
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
			</div>
			<Boxlegend />

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

			<div class="cta">
				<button on:click|once={continuarClick} class="btn">Continuar <Arrow /> </button>
			</div>
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
	.btn {
		display: flex;
		gap: 10px;
		align-items: center;
		font-size: 16px;
	}

	.legend {
		margin-top: 18px;
		padding: 0 24px;
		.box {
			display: grid;
			margin-top: 20px;
			grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
			gap: 20px 5px;
			border: 1px solid #e2e2e2;
			border-radius: 8px;
			padding: 16px 32px;
		}

		.line {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 8px;

			font-weight: 500;
			font-size: 14px;
			line-height: 16px;
		}
	}

	.scenario {
		width: 100%;
		text-align: center;
		margin-top: 20px;
	}
	.scrollers {
		margin-top: 39px;
		width: 100%;
		display: flex;
		justify-content: center;

		div {
			display: flex;
			gap: 38px;
		}
		.scroller {
			background: none;
			border: none;
		}

		@include breakpoint($md) {
			display: none;
		}
	}

	.mapa {
		margin-left: 20px;
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

	.cta {
		display: flex;
		justify-content: center;
		margin-top: 32px;
		margin-bottom: 60px;
	}

	.container {
		padding-right: initial;
		padding-left: initial;
	}

	.principal {
		display: flex;
		gap: 8px;
		margin-bottom: 80px;
		flex-direction: column;
		@include breakpoint($md) {
			flex-direction: row;
			gap: 24px;
		}
	}

	.prota {
		border-radius: 8px;
		background: white;
		.titulos {
			padding: 20px 20px 0px;
			@include breakpoint($md) {
				padding: initial;
			}
		}

		@include breakpoint($md) {
			width: 60%;
			padding: 24px 48px;
		}
	}
</style>
