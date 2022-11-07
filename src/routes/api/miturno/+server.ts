import { json, type RequestHandler } from '@sveltejs/kit';
import {
	SECRET_NIUBIZ_MERCHANTID,
	SECRET_NIUBIZ_CREDENTIALS,
	SECRET_NIUBIZ_NIUBIZAPI,
	SECRET_NIUBIZ_NIUBIZLIB
} from '$env/static/private';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	const clientIpAddress = getClientAddress();
	const intencion = (await request.json()) as App.Compra;

	console.log('indencnion', intencion);

	const evento = await locals.eventosRepo.getEvento(intencion.evento.slug);

	let precioReal: number = 0;

	for (let entrada of intencion.entradas!) {
		const entradaDb = evento.precios.find((t: any) => t.tipo == entrada.tipo);
		if (entradaDb && entrada.base && entrada.cantidad) {
			const precioFinal = entradaDb.descuentos
				? entradaDb.descuentos[0].descontado
				: entradaDb.base;
			const precio = Number(precioFinal) * entrada.cantidad;

			precioReal += precio;
		}
	}

	const { data: token } = await axios.get(`${SECRET_NIUBIZ_NIUBIZAPI}/api.security/v1/security`, {
		headers: {
			Authorization: SECRET_NIUBIZ_CREDENTIALS
		}
	});

	const { data: session } = await axios.post(
		`${SECRET_NIUBIZ_NIUBIZAPI}/api.ecommerce/v2/ecommerce/token/session/${SECRET_NIUBIZ_MERCHANTID}`,
		{
			channel: 'web',
			amount: precioReal,
			antifraud: {
				clientIp: clientIpAddress,
				merchantDefineData: {
					MDD4: locals.user.correo, //cambiar al correo del usuario
					MDD21: '0',
					MDD32: locals.user.dni?.toString(), //DNI , ID o telefono
					MDD75: 'Invitado',
					MDD77: '1' //si el 75 es registrado es: Registro del cliente - hoy
				}
			}
		},
		{
			headers: {
				Authorization: token,
				'Content-Type': 'application/json'
			}
		}
	);

	const newId = uuidv4();

	const pago = {
		sessiontoken: session.sessionKey,
		merchantid: SECRET_NIUBIZ_MERCHANTID,
		purchasenumber: Math.floor(new Date().getTime() / 10),
		amount: precioReal
	};

	const turno = {
		tenant: 'quehay',
		id: newId,
		compra: pago.purchasenumber,
		monto: precioReal,
		info: intencion,
		clientIpAddress: clientIpAddress
	};

	await locals.eventosRepo.postTurno(turno);

	return json({ ...pago, id: newId, niubizlib: SECRET_NIUBIZ_NIUBIZLIB });
};
