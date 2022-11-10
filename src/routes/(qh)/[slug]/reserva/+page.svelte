<script lang="ts">
	import { Breadcrumbs, Counter, Resumen, Steps } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { navigating, page } from '$app/stores';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import { Box, Descuento, Tarjeta, Ticket } from '$lib/icons';
	import { onMount } from 'svelte';
	export let data;
	let posting = false;
	let { evento } = data;

	let totalEntradas: number = 0;
	let totalPrecios: number = 0;
	let otrasEntradas: Array<App.Sentado> = new Array<App.Sentado>();
	let oeCantidad: number = 0;
	let oePrecio: number = 0;
	let oePreciobase: number = 0;
	let oeDescuento: number = 0;
	let modal: any;

	onMount(() => {
		compraData.update((current) => ({
			...current,
			entradas: current.entradas?.map((t) => {
				totalEntradas++;
				t.final = t.online;
				totalPrecios = totalPrecios + Number(t.online);
				return t;
			})
		}));

		evento.precios?.forEach((t: App.Precio) => {
			if (!t.numerado) {
				otrasEntradas.push({
					fila: 0,
					asiento: 0,
					nombre: t.nombre,
					tipo: t.tipo,
					cantidad: t.tipo == $compraData.zona?.tipo ? 1 : 0,
					base: t.online,
					final: t.descuentos ? t.descuentos![0].online : t.online
				});
			}
		});

		otrasEntradas = [...otrasEntradas];
		calcular();
		window.handleSuccess = someFunction;
	});

	const someFunction = (params : any) => {
		alert('a');
	}

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

		oePreciobase = otrasEntradas.reduce<number>((acu, obj) => {
			return acu + obj.cantidad * (obj.base ? obj.base : 0);
		}, 0);

		oePrecio = otrasEntradas.reduce<number>((acu, obj) => {
			return acu + obj.cantidad * (obj.final ? obj.final : 0);
		}, 0);

		oeDescuento = oePreciobase - oePrecio;
	};

	const continuarClick = async () => {
		posting = true;
		compraData.update((current) => ({
			...current,
			entradas: current.entradas ? [...current.entradas].concat(otrasEntradas.filter((t) => t.cantidad > 0)) : otrasEntradas.filter((t) => t.cantidad > 0)
		}));

		const resp = await fetch('/api/miturno', {
			method: 'POST',
			body: JSON.stringify({ ...$compraData }),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('respondio api');
		const datapago = await resp.json();
		console.log('a', datapago);
		VisanetCheckout.configure({
			sessiontoken: datapago.sessiontoken,
			channel: 'web',
			merchantid: datapago.merchantid,
			purchasenumber: datapago.purchasenumber,
			amount: datapago.amount,
			cardholdername: $page.data.user.nombre,
			cardholderlastname : $page.data.user.apellido,
			cardholderemail : $page.data.user.correo,
			usertoken : $page.data.user.id,
			expirationminutes: '20',
			timeouturl: 'about:blank',
			merchantlogo: 'https://www.quehay.pe/img/logo.png',
			formbuttoncolor: '#000000',
			action: `compra/${datapago.id}`,
			complete: handleSuccess
		});

		VisanetCheckout.open();
		posting = false;
	};
</script>

<svelte:head>
	<script type="text/javascript" src="https://static-content.vnforapps.com/v2/js/checkout.js"></script>
	<!-- <script type="text/javascript" src="https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true"></script> -->
</svelte:head>


<Breadcrumbs {evento} />
<Steps paso={4} />

{#if posting || $navigating}
	<div class="progreso">
		<Spinner size="60" color="#D30ED1" unit="px" />
	</div>
{/if}


<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Resumen</h4>
				<p>Lugar reservado</p>
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
										<h6><strong>{entrada.nombre}</strong></h6>
										{#if entrada.numerado}
											<h6>Fila: {entrada.fila + 1}</h6>
											<h6>Mesa: {entrada.asiento + 1}</h6>
										{/if}
									</div>
								</div>
								<div>
									<h6>
										<strong>
											S/ {entrada.online?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</strong>
									</h6>
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
									<h6>{zona.nombre}</h6>
								</div>
							</div>
							<div>
								<Counter precio={zona.final ? zona.final : 0} count={zona.cantidad} on:cambiado={({ detail }) => handleOtrasEntrada(zona.tipo, detail.count)} />
							</div>
						</div>
					{/each}

					{#if oeDescuento > 0}
						<div class="compra ">
							<div class="asiento">
								<div>
									<Descuento />
								</div>
								<div class="etiquetas">
									<h5>Pre-Venta -15%</h5>
								</div>
							</div>
							<div>
								<h5>
									<strong>
										-S/ {oeDescuento}
									</strong>
								</h5>
							</div>
						</div>
					{/if}

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
							{#if oeDescuento > 0}
								<h6 style="text-decoration: line-through;">
									S/ {(totalPrecios + oePreciobase).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</h6>
							{/if}

							<h4>
								<strong>
									S/ {(totalPrecios + oePrecio).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</strong>
							</h4>
						</div>
					</div>
				</div>
			{/if}
			<div class="cta">
				<button on:click={continuarClick} class="btn" disabled={posting || $navigating}>
					{#if posting || $navigating}
						<Spinner size="20" color="#D30ED1" unit="px" />
					{:else}
						Continuar <Tarjeta />
					{/if}
				</button>
			</div>
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
	.progreso {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button[disabled='disabled'],
	button:disabled {
		background: #d30ed038 !important;
	}
	.content-modal {
		padding: 24px;
	}
	.modal {
		background: transparent;
		border: none;
		margin: 0 auto;
		margin-top: 24px;
	}

	.modal::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	.container {
		padding-right: initial;
		padding-left: initial;
	}

	.cta {
		text-align: center;
		margin-top: 52px;
		margin-bottom: 60px;
		.btn {
			padding: 12px 16px;
			min-width: 200px;
		}
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
					h6 {
						margin-bottom: 6px;
					}
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
			padding: 24px 48px;
		}
	}
</style>
