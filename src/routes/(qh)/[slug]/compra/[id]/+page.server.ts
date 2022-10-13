import axios from 'axios';

export const actions = {
	default: async ({ locals, request, params }) => {
		const merchantId = '522591303';
		const credentials = 'Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG';
		const niubizapi = 'https://apitestenv.vnforapps.com';
		const niubizlib = 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true';

		const parameters = decodeURIComponent(await request.text());

		const transaction = Object.fromEntries(new URLSearchParams(parameters));

		const turno = await locals.eventosRepo.getTurno(params.id);

		const { data: token } = await axios.get(`${niubizapi}/api.security/v1/security`, {
			headers: { Authorization: credentials }
		});

		try {
			const resultado = await axios.post(
				`${niubizapi}/api.authorization/v3/authorization/ecommerce/${merchantId}`,
				{
					channel: 'web',
					captureType: 'manual',
					countable: true,
					order: {
						tokenId: transaction.transactionToken,
						purchaseNumber: turno.compra,
						amount: turno.monto,
						currency: 'PEN'
					}
				},
				{
					headers: {
						Authorization: token,
						'Content-Type': 'application/json'
					}
				}
			);

			const exito = resultado.data;
			const compra = turno.info as App.Compra;

			const evento = await locals.eventosRepo.findEvento(compra.evento.id);

			await locals.eventosRepo.confirmarEntrada(compra, evento);

			const entrada = {
				tenant: 'quehay',
				evento: compra.evento.id,
				slug: compra.evento.slug,
				entradas: compra.entradas,
				pago: exito,
				monto: turno.monto,
				numero: turno.compra,
				turno: turno.id
			};

			await locals.eventosRepo.guardarEntrada(entrada);

			return {
				ok: true,
				purchaseNumber: exito.order.purchaseNumber,
				CARD: exito.dataMap.CARD,
				ACTION_DESCRIPTION: exito.dataMap.ACTION_DESCRIPTION,
				TRANSACTION_DATE: exito.dataMap.TRANSACTION_DATE
			};
		} catch (err: any) {
			const fracaso = err.response.data;
			return {
				ok: false,
				purchaseNumber: turno.compra,
				ACTION_DESCRIPTION: fracaso.data.ACTION_DESCRIPTION
			};
		}
	}
};