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
	console.log('request', getClientAddress());
	const intencion = (await request.json()) as App.Compra;

	const evento = await locals.eventosRepo.getEvento(intencion.evento.slug);

	let precioReal: number = 0;

	for (let entrada of intencion.entradas!) {
		const entradaDb = evento.precios.find((t: any) => t.tipo == entrada.tipo);
		if (entradaDb && entrada.base && entrada.cantidad) {
			const precio = Number(entradaDb.base) * entrada.cantidad;
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
				clientIp: '38.25.15.249',
				merchantDefineData: {
					MDD4: 'pe.jose.calderon@gmail.com', //cambiar al correo del usuario
					MDD21: '0',
					MDD32: '980850735', //DNI , ID o telefono
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
		clientadd: getClientAddress()
	};

	await locals.eventosRepo.postTurno(turno);

	return json({ ...pago, id: newId, niubizlib: SECRET_NIUBIZ_NIUBIZLIB });
};
