<script lang="ts">
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import { Breadcrumbs, Counter, Counterbox, Regalo, Resumen, Steps } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { navigating, page } from '$app/stores';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import { Descuento, Tarjeta, Ticket, Deathbox } from '$lib/icons';
	import { onMount } from 'svelte';
	export let data;
	let posting = false;
	let { evento, zona }: { evento: App.Evento; zona: App.Precio } = data;

	let otrasEntradas: Array<App.Sentado> = new Array<App.Sentado>();
	let oeCantidad: number = 0;
	let oePrecio: number = 0;
	let oePreciobase: number = 0;
	let oeDescuento: number = 0;

	onMount(() => {
		if (zona.numerado) {
			if ($compraData.entradas) {
				compraData.update((current) => ({
					...current,
					monto: current.entradas!.reduce((accumulator: number, obj) => {
						const fila = zona.filas.find((t) => t.id == obj.fila);
						const asiento = fila?.sits.find((t) => t.id == obj.asiento);

						const habilitados = asiento.c ? zona.tope! - asiento.c : zona.tope;
						const final = habilitados == zona.tope ? obj.final : habilitados! * zona.onlinei!;

						return accumulator + (final ?? 0);
					}, 0),
					cantidad: current.entradas!.reduce((accumulator: number, obj) => {
						return accumulator + (obj.cantidad ?? 0);
					}, 0)
				}));
			}
		} else {
			compraData.update((current) => ({
				...current,
				entradas: [
					{
						tipo: zona.tipo,
						nombre: zona.nombre,
						numerado: false,
						base: zona.base,
						online: zona.online,
						regalo: zona.regaloIndividual?.una ?? '',
						final: zona.final,
						descuento: zona.descuento,
						cantidad: 1
					}
				],
				cantidad: 1,
				monto: zona.descuentos && zona.descuentos[0] ? zona.descuentos[0].online : zona.online
			}));
		}
	});

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
						return accumulator + (obj.cantidad ?? 0);
				  }, 0)
				: 0
		}));
	};

	const continuarClick = async () => {
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
				tipo: zona.tipo,
				nombre: zona.nombre
			}
		}));

		const resp = await fetch('/api/miturno', {
			method: 'POST',
			body: JSON.stringify({ ...$compraData }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const datapago = await resp.json();

		console.log('a', datapago);

		VisanetCheckout.configure({
			sessiontoken: datapago.sessiontoken,
			channel: 'web',
			merchantid: datapago.merchantid,
			purchasenumber: datapago.purchasenumber,
			amount: datapago.amount,
			cardholdername: $page.data.user.nombre,
			cardholderlastname: $page.data.user.apellido,
			cardholderemail: $page.data.user.correo,
			usertoken: $page.data.user.id,
			expirationminutes: '20',
			timeouturl: 'about:blank',
			merchantlogo: 'https://www.quehay.pe/img/logo.png',
			formbuttoncolor: '#000000',
			action: `compra/${datapago.id}${$page.url.search ?? ''}`,
			complete: function (params: any) {
				console.log('p', params);
			}
		});

		VisanetCheckout.open();
		posting = false;
	};
</script>

<svelte:head>
	<script type="text/javascript" src={PUBLIC_NIUBIZ_LIBRE}></script>
</svelte:head>

<Breadcrumbs {evento} />
<Steps paso={4} />

{#if posting || $navigating != null}
	<div class="progreso">
		<Spinner size="60" color="#D30ED1" unit="px" />
	</div>
{/if}

<section class="container">
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Resumen</h4>
			</div>
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
							<Counter entrada={$compraData.entradas[0]} {zona} on:cambiado={handleCantidad} />
						</div>
					{/if}

					<div class="compra totales">
						<div class="asiento">
							<div>
								<Ticket />
							</div>
							<div class="etiquetas">
								<h2>
									Total: {$compraData.cantidad}
								</h2>
							</div>
						</div>
						<div>
							<h4>
								<strong>
									S/ {($compraData.monto ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</strong>
							</h4>
						</div>
					</div>
				</div>

				<div class="cta">
					<button on:click={continuarClick} class="btn" disabled={posting || $navigating != null}>
						{#if posting || $navigating}
							<Spinner size="20" color="#D30ED1" unit="px" />
						{:else}
							Continuar <Tarjeta />
						{/if}
					</button>
				</div>
			{/if}
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
	.compra {
		min-width: 300px;
		padding: 32px;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
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
