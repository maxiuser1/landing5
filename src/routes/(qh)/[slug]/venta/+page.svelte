<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Breadcrumbs, Counter, Resumen, Steps } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { zonas } from '$lib/components/Evento/zonas';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import { Box, Descuento, Qrcode, Tarjeta, Ticket } from '$lib/icons';
	import type { ActionResult } from '@sveltejs/kit';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	export let data;
	let { evento } = data;
	let posting = false;

	let scanning = false;
	let camara = false;
	let html5Qrcode: any;

	let totalEntradas: number = 0;
	let totalPrecios: number = 0;
	let otrasEntradas: Array<App.Sentado> = new Array<App.Sentado>();
	let oeCantidad: number = 0;
	let oePrecio: number = 0;
	let oePreciobase: number = 0;
	let oeDescuento: number = 0;

	onMount(() => {
		if ($compraData.entradas && $compraData.zona && $compraData.zona.base) {
			totalEntradas = $compraData.entradas?.length;
			totalPrecios = totalEntradas * $compraData.zona.base;
		}

		evento.precios?.forEach((t: App.Precio) => {
			if (!t.numerado) {
				otrasEntradas.push({
					fila: 0,
					asiento: 0,
					nombre: t.nombre,
					tipo: t.tipo,
					cantidad: 0,
					base: t.base,
					final: t.descuentos ? t.descuentos![0].descontado : t.base,
					tickets: []
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
				t.tickets = [];
				for (let i = 0; i < cantidad; i++) {
					t.tickets?.push({ c: `${tipo}_${i}`, v: '' });
				}
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
		const datapago = await resp.json();
	};

	async function handleSubmit(event: any) {
		const data = new FormData(this);
		data.append('payload', JSON.stringify({ ...$compraData }));
		console.log('data', data);
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = await response.json();

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}

	function start() {}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
		camara = false;
	}

	function onScanSuccess(decodedText: any, decodedResult: any) {
		// lista[currentIndex].valor = decodedText;
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}

	const showDialogClick = (zona: any, ticket: any) => {
		console.log('zona', zona);
		console.log('ticket', ticket);
		camara = true;

		html5Qrcode = new Html5Qrcode('reader');

		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			(decodedText: any, decodedResult: any) => {
				otrasEntradas = otrasEntradas.map((t) => {
					if (t.tipo == zona.tipo && t.tickets) {
						t.tickets = t.tickets?.map((p) => {
							if (p.c == ticket.c) {
								p.v = decodedText;
							}
							return p;
						});
					}
					return t;
				});
			},
			onScanFailure
		);
		scanning = true;
	};
</script>

<div class="modal" style:visibility={camara ? 'visible' : 'hidden'}>
	<reader id="reader" />
	{#if scanning}
		<button on:click={stop} type="button" class="btn">Cerrar</button>
	{:else}
		<button on:click={start} type="button" class="btn">Escanear</button>
	{/if}
</div>

<Breadcrumbs {evento} />
<br />
<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Resumen</h4>
				<p>Lugar reservado</p>
			</div>

			<form method="POST" on:submit|preventDefault={handleSubmit}>
				<input type="text" name="nombres" />

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
												S/ {entrada.base?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
									<Counter precio={zona.base ? zona.base : 0} count={zona.cantidad} on:cambiado={({ detail }) => handleOtrasEntrada(zona.tipo, detail.count)} />

									<div>
										{#if zona.tickets}
											{#each zona.tickets as ticket, j}
												<div class="input-group">
													<input type="text" name={ticket.c} bind:value={ticket.v} class="form-control" />
													<button on:click={() => showDialogClick(zona, ticket)} type="button" class="btn"><Qrcode /></button>
												</div>
											{/each}
										{/if}
									</div>
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
										<h5>Pre-Venta</h5>
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
					<button type="submit" class="btn" disabled={posting}>
						{#if posting}
							<Spinner size="20" color="#D30ED1" unit="px" />
						{:else}
							Continuar
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</section>

<style lang="scss">
	#reader {
		width: 100%;
		min-height: 80vh;
		background-color: black;
	}

	.modal {
		width: 100%;
		height: 90vh;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		display: flex;
		align-items: center;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
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
			width: 100%;
			padding: 24px 48px;
		}
	}
</style>
