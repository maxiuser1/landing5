<script lang="ts">
	import { Breadcrumbs, Counter, Resumen, Steps } from '$lib/components/Evento';
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
					nombre:t.nombre,
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
		const datapago = await resp.json();
		VisanetCheckout.configure({
			sessiontoken: datapago.sessiontoken,
			channel: 'web',
			merchantid: datapago.merchantid,
			purchasenumber: datapago.purchasenumber,
			amount: datapago.amount,
			expirationminutes: '20',
			timeouturl: 'about:blank',
			merchantlogo: 'https://www.quehay.pe/img/logo.png',
			formbuttoncolor: '#000000',
			action: `compra/${datapago.id}`,
			complete: function (params: any) {
				console.log(params);
			}
		});
		VisanetCheckout.open();
	};
</script>

<svelte:head>
	<script
		type="text/javascript"
		src="https://static-content-qas.vnforapps.com/v2/js/checkout.js"></script>
</svelte:head>

<Breadcrumbs {evento} />
<Steps paso={4} />


<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Resumen</h4>
				
			</div>
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
									<h2>{entrada.nombre}</h2>
									{#if entrada.numerado}
										<h5>Fila: {entrada.fila + 1}</h5>
										<h6>Mesa: {entrada.asiento + 1}</h6>
									{/if}
								</div>
							</div>
							<div>
								<h4>
									S/ {entrada.base?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</h4>
							</div>
						</div>
					{/each}
				{/if}

				{#each otrasEntradas as zona, i}
					<div class="compra odd">
						<div class="asiento">
							<div>
								<Ticket />
							</div>
							<div class="etiquetas">
								<h2>{zona.nombre}</h2>
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
							S/ {(totalPrecios + oePrecio).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
						</h1>
					</div>
				</div>
			</div>
		{/if}
			<div class="cta">
				<button on:click={continuarClick} class="btn">Continuar <Tarjeta /> </button>
			</div>
		</div>
		<Resumen {evento} />
	</div>
</section>


<style lang="scss">
	.container{
		padding-right: initial;
		padding-left: initial;
	}

	.cta {
		text-align: center;
		margin-top: 52px;
		margin-bottom: 60px;
		.btn {
			padding: 12px 16px;
		}
	}
	

	.principal{
		display: flex;
		gap:8px;
		margin-bottom: 80px;
  		flex-direction: column;
		@include breakpoint($md) {
			flex-direction: row;
			gap:24px;
		}
	}

	.prota {
		border-radius: 8px;
		background: white;
		.titulos {
			padding:20px 20px 0px;
			@include breakpoint($md) {
				padding:initial;
			}
		}

		.compras {

			margin-top: 60px;

			.compra {
				min-width: 300px;
				padding: 32px;
				border-radius: 8px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;

				@include breakpoint($sm) {
					min-width: 400px;
				}

				@include breakpoint($md) {
					min-width: 500px;
				}
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

		@include breakpoint($md) {
			width: 60%;
			padding:24px 48px;
		}
	}
</style>
