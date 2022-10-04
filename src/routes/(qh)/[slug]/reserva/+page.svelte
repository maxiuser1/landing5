<script lang="ts">
	import { Breadcrumbs, Counter, Steps } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { Box, Tarjeta, Ticket } from '$lib/icons';
	import { onMount } from 'svelte';
	export let data;
	let { evento } = data;

	let totalEntradas: number = 0;
	let totalPrecios: number = 0;
	let otrasEntradas: Array<App.Sentado> = new Array<App.Sentado>();
	let oeCantidad: number = 0;
	let oePrecio: number = 0;
	let modal: any;

	onMount(() => {
		if ($compraData.entradas && $compraData.zona && $compraData.zona.base) {
			totalEntradas = $compraData.entradas?.length;
			totalPrecios = totalEntradas * $compraData.zona.base;
		}

		evento.precios?.forEach((t) => {
			if (!t.numerado) {
				otrasEntradas.push({
					fila: 0,
					asiento: 0,
					tipo: t.tipo,
					cantidad: t.tipo == $compraData.zona?.tipo ? 1 : 0,
					base: t.base
				});
			}
		});

		otrasEntradas = [...otrasEntradas];
		calcular();
	});

	const handleOtrasEntrada = (tipo: any, cantidad: any) => {
		otrasEntradas = otrasEntradas.map((t) => {
			if (t.tipo == tipo) {
				t.cantidad = cantidad;
			}
			return t;
		});
		calcular();
	};

	const calcular = () => {
		oeCantidad = otrasEntradas.reduce<number>((acu, obj) => {
			return acu + obj.cantidad;
		}, 0);

		oePrecio = otrasEntradas.reduce<number>((acu, obj) => {
			return acu + obj.cantidad * (obj.base ? obj.base : 0);
		}, 0);
	};

	const continuarClick = async () => {
		compraData.update((current) => ({
			...current,
			entradas: current.entradas
				? [...current.entradas].concat(otrasEntradas.filter((t) => t.cantidad > 0))
				: otrasEntradas.filter((t) => t.cantidad > 0)
		}));

		const resp = await fetch('/api/miturno', {
			method: 'POST',
			body: JSON.stringify({ ...$compraData }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const total = await resp.json();
		console.log('resp', total);
	};
</script>

<Breadcrumbs {evento} />
<Steps paso={4} />

<section class="container">
	<div class="grid">
		<div class="principal">
			<h1>Resumen</h1>
			{#if $compraData.zona && $compraData.zona.base}
				<div class="compras">
					{#if $compraData.entradas}
						{#each $compraData.entradas.filter((t) => t.numerado) as entrada, i}
							<div class="compra" class:odd={i % 2 == 0}>
								<div class="asiento">
									<div>
										<Box width={30} color="red" disabled={false} />
									</div>
									<div class="etiquetas">
										<h2>{entrada.tipo}</h2>
										{#if entrada.numerado}
											<h5>Fila: {entrada.fila + 1}</h5>
											<h6>Mesa: {entrada.asiento + 1}</h6>
										{/if}
									</div>
								</div>
								<div>
									<h4>
										S/ {entrada.base}
									</h4>
								</div>
							</div>
						{/each}
					{/if}

					{#each otrasEntradas as zona, i}
						<div class="compra" class:odd={i % 2 == 0}>
							<div class="asiento">
								<div>
									<Ticket />
								</div>
								<div class="etiquetas">
									<h2>{zona.tipo}</h2>
								</div>
							</div>
							<div>
								<Counter
									precio={zona.base ? zona.base : 0}
									count={zona.cantidad}
									on:cambiado={({ detail }) => handleOtrasEntrada(zona.tipo, detail.count)}
								/>
							</div>
						</div>
					{/each}

					<div class="compra totales">
						<div class="asiento">
							<div>
								<Ticket />
							</div>
							<div class="etiquetas">
								<h2>
									Total: {totalEntradas + oeCantidad}
								</h2>
							</div>
						</div>
						<div>
							<h1>
								S/ {totalPrecios + oePrecio}
							</h1>
						</div>
					</div>
				</div>
			{/if}

			<button on:click={continuarClick} class="btn">Continuar <Tarjeta /> </button>
		</div>
		<div class="detalle">
			<h1>Detalle</h1>
			<h3>{evento.general?.artista}</h3>
			<h4>{evento.general?.nombre}</h4>
		</div>
	</div>
</section>

<style lang="scss">
	.form-group {
		padding: 10px;
		text-align: left;
	}

	.cta {
		width: 100%;
		text-align: center;
		.btn {
			padding: 12px 16px;
		}
	}

	.grid {
		display: flex;
		gap: 12px;
		flex-direction: column;
		@include breakpoint($md) {
			flex-direction: row;
		}
	}

	.principal {
		margin-bottom: 80px;
		background-color: white;
		flex-grow: 2;
		padding: 40px 48px;

		h1 {
			font-weight: 700;
			font-size: 24px;
			line-height: 29px;
		}

		h2 {
			margin-top: 8px;
			font-weight: 400;
			font-size: 16px;
			line-height: 16px;
		}

		.compras {
			margin-top: 60px;

			.compra {
				padding: 32px;
				border-radius: 8px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;
			}

			.asiento {
				display: flex;
				align-items: center;
				gap: 10px;

				.etiquetas {
					padding-left: 24px;
				}
			}

			.odd {
				background-color: #f9f9f9;
			}

			.totales {
				background-color: #f9f9f97f;
			}
		}
	}
	.detalle {
		padding: 40px 48px;
		background-color: white;
		flex-grow: 1;
	}
</style>
