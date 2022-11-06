import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const actions = {
	default: async ({ locals, request, params }) => {
		const merchantId = '522591303';
		const credentials = 'Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG';
		const niubizapi = 'https://apisandbox.vnforappstest.com';
		const niubizlib = 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true';

		const parameters = decodeURIComponent(await request.text());

		const transaction = Object.fromEntries(new URLSearchParams(parameters));

		const turno = await locals.eventosRepo.getTurno(params.id);

		const { data: token } = await axios.get(`${niubizapi}/api.security/v1/security`, {
			headers: { Authorization: credentials }
		});
		console.log('token', transaction);
		console.log('turno', turno);
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
			console.log('res', resultado);

			const exito = resultado.data;
			const compra = turno.info as App.Compra;

			const evento = await locals.eventosRepo.findEvento(compra.evento.id);

			await locals.eventosRepo.confirmarEntrada(compra, evento);

			const entrada = {
				tenant: 'quehay',
				evento: compra.evento,
				slug: compra.evento.slug,
				entradas: compra.entradas,
				pago: exito,
				monto: turno.monto,
				numero: turno.compra,
				id: turno.id,
				user: {
					nombre: locals.user.nombre,
					correo: locals.user.correo,
					apellido: locals.user.apellido,
					dni: locals.user.dni,
					id: locals.user.id
				},
				turno: turno.id
			};
			await locals.eventosRepo.guardarEntrada(entrada);
		} catch (err: any) {
			const fracaso = err.response.data;
			return {
				ok: false,
				purchaseNumber: turno.compra,
				ACTION_DESCRIPTION: fracaso.data.ACTION_DESCRIPTION
			};
		}

		throw redirect(303, `/ticket/${turno.id}`);
	}
};
