<script lang="ts">
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import { Resumen, Steps } from '$lib/components/Evento';
	import { navigating, page } from '$app/stores';
	import Compras from '$lib/components/Evento/Compras.svelte';
	import Mediospago from '$lib/components/Evento/Mediospago.svelte';
	import { compraData } from '$lib/components/Evento/esto.js';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import { Tarjeta } from '$lib/icons/index.js';

	export let data;
	let { evento } = data;
	let posting = false;
	const pagarClick = async () => {
		posting = true;
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
				console.info('p', params);
			}
		});
		VisanetCheckout.open();
		posting = false;
	};
</script>

<svelte:head>
	<script type="text/javascript" src={PUBLIC_NIUBIZ_LIBRE}></script>
</svelte:head>

<section class="container">
	<div>
		<div class="principal">
			<div class="steps">
				<Steps paso={4} />
			</div>
			<div class="lugar">
				<Mediospago />
			</div>

			<div class="lugar">
				<Compras />
			</div>
		</div>
	</div>
	<div class="detalles">
		<Resumen {evento} />
		<button class="btn" on:click={pagarClick} disabled={posting || $navigating != null}>
			{#if posting || $navigating}
				<Spinner size="20" color="#fff" unit="px" />
			{:else}
				Pagar <Tarjeta />
			{/if}
		</button>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.steps {
		padding: 40px 16px 32px;
	}

	.lugar {
		border-radius: 8px;
		background: #f9f9f9;

		margin-bottom: 20px;
		padding: 40px 32px;
		h4 {
			font-weight: 100;
			margin-bottom: 10px;
		}

		@include breakpoint($md) {
			margin-right: 24px;
		}
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include breakpoint($md) {
			grid-template-columns: 728px 352px;
		}
	}

	.detalles {
		padding: 40px 24px;
		min-width: 100%;
		border: 1px solid #fff;
		background: var(--White-White_98, #f9f9f9);
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

		.btn {
			width: 100%;
			margin-top: 40px;
			font-size: 16px;
			font-weight: 700;
		}
	}
</style>
