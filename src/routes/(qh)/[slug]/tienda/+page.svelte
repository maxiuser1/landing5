<script lang="ts">
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';

	import { Resumen, Total } from '$lib/components/Evento/index.js';
	import { Breadcrumbs, Counter } from '$lib/components/Tienda';
	import { cartItems } from '$lib/components/Tienda/store.js';
	import { onDestroy } from 'svelte';
	import { navigating, page } from '$app/stores';

	import { get } from 'svelte/store';
	import { Spinner } from '$lib/components/Shared/ui/Spinner/index.js';
	import { Tarjeta } from '$lib/icons/index.js';
	import Arrow from '$lib/icons/Arrow.svelte';
	export let data;
	let posting = false;

	let { productos, evento } = data;
	let mostrarFormulario = false;
	let correo: any;
	let nombre: any;
	let ubicacion: any;
	let apellido: any;
	let dni: any;
	let telefono: any;

	let myStoreContent: any = [];
	let totalPago: number = 0;
	let totalCantidad: number = 0;
	const unsubscribe = cartItems.subscribe((value) => {
		myStoreContent = value;
		totalPago = value.reduce((sum, current) => sum + current.total, 0);
		totalCantidad = value.length;
	});

	onDestroy(unsubscribe);

	const continuarClick = () => {
		mostrarFormulario = true;
	};

	const volverClick = () => {
		mostrarFormulario = false;
	};

	const pagarClick = async () => {
		const resp = await fetch('/api/mitienda', {
			method: 'POST',
			body: JSON.stringify({
				productos: get(cartItems),
				invitado: {
					nombre: nombre.value,
					apellido: apellido.value,
					correo: correo.value?.toLowerCase(),
					dni: dni.value,
					telefono: telefono.value
				},
				ubicacion: ubicacion.value,
				total: totalPago
			}),
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
			cardholdername: $page.data.user ? $page.data.user.nombre : nombre.value,
			cardholderlastname: $page.data.user ? $page.data.user.apellido : apellido.value,
			cardholderemail: $page.data.user ? $page.data.user.correo : correo.value,
			usertoken: $page.data.user ? $page.data.user.id : dni.value,
			expirationminutes: '20',
			timeouturl: 'about:blank',
			merchantlogo: 'https://www.quehay.pe/img/logo.png',
			formbuttoncolor: '#000000',
			action: `tienda/compra/${datapago.id}${$page.url.search ?? ''}`,
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

<section class="container">
	<div class="principal">
		<div class="prota">
			{#if !mostrarFormulario}
				<div class="titulos">
					<h4>Tienda</h4>
					<p>Tenemos estos productos disponibles para el consumo en local</p>

					<div class="productos">
						{#each productos as producto}
							<Counter {producto} />
						{/each}
					</div>
					<!-- {JSON.stringify(myStoreContent)} -->
				</div>
				<br />
				<br /> <br />
				<br />
				<Total cantidad={totalCantidad} monto={totalPago} />
				<br />
				<br />
				<section class="cta">
					<button class="btn" on:click={continuarClick} type="button">Continuar</button>
				</section>
			{/if}

			{#if mostrarFormulario}
				<form method="POST" on:submit|preventDefault={pagarClick}>
					<div class="formulario">
						<div class="form-group">
							<button class="btn-arrow" on:click={volverClick}>
								<Arrow left={true} color={'pink'} />
							</button>
							Complete sus datos porfavor
						</div>
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

						<div class="form-group">
							<input type="text" name="ubicacion" placeholder="Ubicación" bind:this={ubicacion} required />
						</div>
					</div>

					<br />
					<Total cantidad={totalCantidad} monto={totalPago} />
					<br />
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
			{/if}
		</div>
		<Resumen {evento} />
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.btn-arrow {
		border: none;
		background: none;
	}
	.cta {
		width: 100%;
		text-align: center;
	}
	.formulario {
		background: #f8f8f8;
		padding: 20px 0px;
		margin-bottom: 20px;
	}

	.comprar {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 22px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
		border: none;
		font-size: 32px;
		color: white;
		width: 100%;
		min-width: 100%;
	}

	.productos {
		margin-top: 30px;
		display: grid;

		grid-template-columns: repeat(3, 1fr);

		grid-auto-rows: auto;

		grid-gap: 1rem;
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
