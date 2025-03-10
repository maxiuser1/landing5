<script lang="ts">
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import { page } from '$app/state';
	let { data } = $props();
	let { datapago, turno } = data;
	function niubizLoaded() {
		VisanetCheckout.configure({
			sessiontoken: datapago.sessiontoken,
			channel: 'web',
			merchantid: datapago.merchantid,
			purchasenumber: Number(datapago.purchasenumber),
			amount: datapago.amount,
			cardholdername: page.data.user,
			cardholderlastname: page.data.user,
			cardholderemail: page.data.user,
			usertoken: page.data.user,
			expirationminutes: '20',
			timeouturl: 'about:blank',
			merchantlogo: 'https://www.quehay.pe/img/logo.png',
			formbuttoncolor: '#000000',
			action: `compra/${turno.id}${page.url.search ?? ''}`,
			complete: function (params: any) {
				console.log('p', params);
			}
		});
		VisanetCheckout.open();
	}
</script>

<svelte:head>
	<script type="text/javascript" src={PUBLIC_NIUBIZ_LIBRE}></script>
</svelte:head>

<h1>Reserva</h1>
<h1>Reserva</h1>
<h1>Reserva</h1>
<h1>Reserva {data.turno.id}</h1>
<button onclick={niubizLoaded}>Caaa</button>
{JSON.stringify(data.datapago)}
