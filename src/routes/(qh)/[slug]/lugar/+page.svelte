<script lang="ts">
	import { goto } from '$app/navigation';
	import { Breadcrumbs, Resumen, Steps } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { Arrow, Box } from '$lib/icons';
	import { page } from '$app/stores';

	export let data;
	let { evento } = data;
	let filas: Array<App.Fila> = evento.precios?.find((t: any) => t.tipo == $compraData.zona?.tipo)?.filas ?? new Array<App.Fila>();
	const sitWidth = 25;
	const filaWidth = 100;

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
			alert('Porfavor seleccione un asiento');
			return;
		}

		compraData.update((current) => ({
			...current,
			entradas: asientos
		}));

		const esPromotor = $page.data.user.rol != undefined && $page.data.user.rol == 'promotor';

		esPromotor ? goto(`../${evento.general?.slug}/venta`) : goto(`../${evento.general?.slug}/reserva`);
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
				<div class="asientos" style:width="{filaWidth} px">
					{#each filas as fila}
						<ul class="fila">
							{#each fila.sits as asiento}
								<li style:min-width="{sitWidth}px">
									{#if asiento.s != 0}
										<Box
											disabled={asiento.s >= 2}
											width={sitWidth}
											color={asiento.s == 1 ? '#ff5260' : asiento.s == -1 ? '#D4D4D4' : 'blue'}
											on:clickeado={() => {
												if (asiento.s < 2) {
													asiento.s = asiento.s * -1;
												}
											}}
										/>
									{/if}
								</li>
							{/each}
						</ul>
					{/each}
				</div>
			</div>
			<div class="cta">
				<button on:click|once={continuarClick} class="btn">Continuar ({filas.reduce((count, current) => count + current.sits.filter((t) => t.s == 1).length, 0)}) <Arrow /> </button>
			</div>
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
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
		text-align: center;
		margin-top: 52px;
		margin-bottom: 60px;
		.btn {
			padding: 12px 16px;
		}
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
