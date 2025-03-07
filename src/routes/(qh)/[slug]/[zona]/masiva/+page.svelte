<script lang="ts">
	import { Breadcrumbs, Counter, Counterbox, Counterd, FormasPago, Steps } from '$lib/components/Evento';
	import { onMount, SvelteComponent } from 'svelte';
	import { compraData } from '$lib/components/Evento/store';
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { BarcodeReader, BarcodeScanner } from 'dynamsoft-javascript-barcode';
	import type { ActionResult } from '@sveltejs/kit';
	import { Qrcode } from '$lib/icons';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import MCounterd from '$lib/components/Evento/MCounterd.svelte';

	export let data;
	let { evento, zona }: { evento: App.Evento; zona: App.Precio } = data;
	let posting = false;

	let scanning = false;
	let camara = false;

	let ticketesGeneral: Array<App.Tickete> = new Array<App.Tickete>();
	let ticketesBox: Array<App.Tickete> = [];

	let zonaTipo: string | undefined;
	let ticketc: string | undefined;

	let reader: any;
	let barcodeinputter: SvelteComponent;

	onMount(async () => {
		if (zona.numerado) {
			if ($compraData.entradas) {
				compraData.update((current) => ({
					...current,
					monto: current.entradas!.reduce((accumulator: number, obj) => {
						const fila = zona.filas.find((t) => t.id == obj.fila);
						const asiento = fila?.sits.find((t) => t.id == obj.asiento);

						const habilitados = asiento.c ? zona.tope! - asiento.c : zona.tope;

						if (habilitados == zona.tope) {
							ticketesBox.push({ c: `${zona.codigo}_${fila!.id}_${asiento!.id}`, v: '' });
						}

						const final = habilitados == zona.tope ? obj.final : habilitados! * zona.promotori!;

						return accumulator + (final ?? 0);
					}, 0),
					cantidad: current.entradas!.reduce((accumulator: number, obj) => {
						return accumulator + (obj.cantidad ?? 0);
					}, 0)
				}));
			}
		} else {
			if (!zona.qrcode) {
				ticketesGeneral.push({ c: `${zona.codigo}_1`, v: '' });
			}

			compraData.update((current) => ({
				...current,
				entradas: [
					{
						tipo: zona.tipo,
						codigo: zona.codigo,
						nombre: zona.nombre,
						numerado: false,
						base: zona.base,
						promotor: zona.promotor,
						regalo: zona.regaloIndividual?.una ?? '',
						final: zona.final,
						descuento: zona.descuento,
						cantidad: 1
					}
				],
				cantidad: 1,
				monto: zona.final
			}));
		}
		ticketesBox = [...ticketesBox];
		ticketesGeneral = [...ticketesGeneral];
	});

	async function handleSubmit(event: any) {
		posting = true;

		compraData.update((current) => ({
			...current,
			evento: {
				id: evento.id,
				slug: evento.general?.slug,
				artista: evento.general?.artista,
				nombre: evento.general?.nombre,
				lugar: `${evento.ubicacion?.ciudad} ${evento.ubicacion?.nombre}`,
				fecha: evento.fechas[0].dia
			},
			zona: {
				codigo: zona.codigo ?? '',
				nombre: zona.nombre
			}
		}));

		const data = new FormData(this);
		data.append('payload', JSON.stringify({ ...$compraData }));
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

	const showDialogClick = (ticket: any) => {
		camara = true;
		zonaTipo = zona.codigo;
		ticketc = ticket.c;
	};

	const handleCantidad = () => {
		compraData.update((current) => ({
			...current,
			monto: current.entradas
				? current.entradas.reduce((accumulator, obj) => {
						return accumulator + (obj.final ?? 0);
				  }, 0)
				: 0,
			cantidad: current.entradas
				? current.entradas.reduce((accumulator, obj) => {
						if (zona.numerado) {
							const fila = zona.filas.find((t) => t.id == obj.fila);
							const asiento = fila?.sits.find((t) => t.id == obj.asiento);
							if (obj.cantidad == zona.tope) {
								ticketesBox = [
									{
										c: `${zona.codigo}_${fila!.id}_${asiento!.id}`,
										v: ''
									}
								];
							} else {
								ticketesBox = [];
							}
						} else {
							if (!zona.qrcode) {
								if (ticketesGeneral.length < obj.cantidad) {
									for (let i = 1; i <= obj.cantidad; i++) {
										const tcode = `${zona.codigo}_${i}`;

										if (!ticketesGeneral.some((t) => t.c == tcode)) {
											ticketesGeneral = [...ticketesGeneral, { c: tcode, v: '' }];
										}
									}
								} else if (ticketesGeneral.length > obj.cantidad) {
									ticketesGeneral.splice(-1);
								}
							}
						}

						return accumulator + (obj.cantidad ?? 0);
				  }, 0)
				: 0
		}));

		ticketesGeneral = [...ticketesGeneral];
	};

	function scanCanceld(event: any) {
		ticketc = undefined;
		zonaTipo = undefined;
		camara = false;
	}

	function scanned(event: any) {
		if (zona.numerado) {
			ticketesBox = [
				...ticketesBox.map((t) => {
					if (t.c == ticketc) {
						t.v = event.detail.text;
					}
					return t;
				})
			];
		} else {
			ticketesGeneral = [
				...ticketesGeneral.map((t) => {
					if (t.c == ticketc) {
						t.v = event.detail.text;
					}
					return t;
				})
			];
		}

		camara = false;
		zonaTipo = undefined;
		ticketc = undefined;
	}
</script>

<Breadcrumbs {evento} />

<br />
<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Venta Directa</h4>
			</div>
			<form method="POST" on:submit|preventDefault={handleSubmit}>
				{#if $compraData.entradas && zona}
					<div class="compras">
						{#if zona.numerado}
							{#each $compraData.entradas as entrada, i}
								<div class="compra" class:odd={i % 2 == 0}>
									<Counterbox {entrada} {zona} on:cambiado={handleCantidad} />
								</div>
							{/each}
						{:else}
							<div class="compra">
								<MCounterd entrada={$compraData.entradas[0]} {zona} on:cambiado={handleCantidad} />
							</div>
						{/if}
					</div>
				{/if}

				<div class="form-group">
					<label for="nombres">Información del cliente</label>
					<input type="text" name="nombre" class="form-control" placeholder="Nombre" required />
				</div>
				<div class="form-group">
					<input type="text" name="apellido" class="form-control" placeholder="Apellido" required />
				</div>
				<div class="form-group">
					<input type="text" name="dni" class="form-control" placeholder="DNI" required />
				</div>

				<div class="form-group">
					<input type="email" name="correo" class="form-control" placeholder="Correo" required />
				</div>

				<div class="form-group">
					<select name="tipo" class="form-control">
						<option value="impreso">Con ticket fisico</option>
						<option value="qr">Con generación de código QR</option>
						<option value="autopicado">Con picado automatico</option>
					</select>
				</div>

				<FormasPago monto={$compraData.monto} />

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
	@use './static/style.scss' as mixin;
	.tickets {
		padding: 2px 24px;
		display: flex;
		flex-direction: column;
		gap: 4px;
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
		@include mixin.breakpoint(mixin.$md) {
			flex-direction: row;
			gap: 24px;
		}
	}

	.prota {
		border-radius: 8px;
		background: white;
		.titulos {
			padding: 20px 20px 0px;
			@include mixin.breakpoint(mixin.$md) {
				padding: initial;
			}
		}

		.compras {
			margin-top: 20px;

			.compra {
				min-width: 300px;
				padding: 12px 24px;
				border-radius: 8px;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				align-items: center;
				gap: 10px;

				@include mixin.breakpoint(mixin.$sm) {
					min-width: 400px;
				}

				@include mixin.breakpoint(mixin.$md) {
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

			@include mixin.breakpoint(mixin.$md) {
				margin-top: 60px;
			}
		}

		@include mixin.breakpoint(mixin.$md) {
			width: 100%;
			padding: 24px 48px;
		}
	}
</style>
