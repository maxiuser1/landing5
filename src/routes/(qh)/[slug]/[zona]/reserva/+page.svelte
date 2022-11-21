<script lang="ts">
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import { Breadcrumbs, Counter, Counterbox, Regalo, Resumen, Steps, Total } from '$lib/components/Evento';
	import { compraData } from '$lib/components/Evento/store';
	import { navigating, page } from '$app/stores';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import { Descuento, Tarjeta, Ticket, Deathbox } from '$lib/icons';
	import { onMount } from 'svelte';
	export let data;
	let posting = false;
	let { evento, zona }: { evento: App.Evento; zona: App.Precio } = data;

	let mostrarFormulario = false;
	let correo: any;
	let nombre: any;
	let apellido: any;
	let dni: any;
	let telefono: any;

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

	const continuarClick = () => {
		mostrarFormulario = true;
	};

	const pagarClick = async () => {
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

		if (mostrarFormulario) {
			compraData.update((current) => ({
				...current,
				invitado: {
					nombre: nombre.value,
					apellido: apellido.value,
					correo: correo.value?.toLowerCase(),
					dni: dni.value,
					telefono: telefono.value
				}
			}));
		}

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

	function volverDetalle() {
		mostrarFormulario = false;
	}
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
			{#if mostrarFormulario}
				<div class="compras">
					<div on:click={volverDetalle}>
						<Total volver={true} cantidad={$compraData.cantidad} monto={$compraData.monto ?? 0} />
					</div>
					<form method="POST" on:submit|preventDefault={pagarClick}>
						<div class="formulario">
							<h5>Tus datos</h5>
							<div class="form-group">
								<input name="correo" placeholder="Correo" bind:this={correo} type="email" required />
							</div>

							<div class="form-group">
								<input type="text" name="nombre" placeholder="Nombre" bind:this={nombre} required />
							</div>

							<div class="form-group">
								<input type="text" name="apellido" placeholder="Apellidos" bind:this={apellido} required />
							</div>

							<div class="form-group">
								<input type="text" name="dni" placeholder="Documento de identidad" bind:this={dni} required />
							</div>

							<div class="form-group">
								<input type="text" name="telefono" placeholder="Teléfono / Movil" bind:this={telefono} required />
							</div>
						</div>
						<div class="cta">
							<button type="submit" class="btn" disabled={posting || $navigating != null}>
								{#if posting || $navigating}
									<Spinner size="20" color="#D30ED1" unit="px" />
								{:else}
									Pagar <Tarjeta />
								{/if}
							</button>
						</div>
					</form>
				</div>
			{:else if $compraData.entradas && zona}
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

					<Total cantidad={$compraData.cantidad} monto={$compraData.monto ?? 0} />
				</div>

				<div class="cta">
					{#if $page.data.user}
						<button on:click={pagarClick} class="btn" disabled={posting || $navigating != null}>
							{#if posting || $navigating}
								<Spinner size="20" color="#D30ED1" unit="px" />
							{:else}
								Pagar <Tarjeta />
							{/if}
						</button>
					{:else}
						<button class="btn" on:click={continuarClick} type="button">Continuar</button>
					{/if}
				</div>
			{/if}
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
	.formulario {
		h5 {
			padding: 12px 24px;
		}
	}
	.compra {
		min-width: 300px;
		padding: 32px 32px 10px 32px;
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

	.progreso {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button[disabled='disabled'],
	button:disabled {
		background: #d30ed038 !important;
	}

	.container {
		padding-right: initial;
		padding-left: initial;
	}

	.btn {
		margin-bottom: 20px;
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
			display: none;
			@include breakpoint($md) {
				display: block;
				padding: initial;
			}
		}

		.compras {
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: #f9f9f9;
		}

		@include breakpoint($md) {
			width: 60%;
			padding: 24px 48px;
		}
	}
</style>
