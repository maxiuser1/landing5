import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const POST: RequestHandler = async ({ locals, request }) => {
	const intencion = (await request.json()) as App.Compra;

	const evento = await locals.eventosRepo.getEvento(intencion.evento.slug);

	// const merchantId = env.VITE_NIUBIZ_URL;
	const merchantId = '522591303';
	const credentials = 'Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG';
	const niubizapi = 'https://apitestenv.vnforapps.com';
	const niubizlib = 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true';

	let precioReal: number = 0;

	for (let entrada of intencion.entradas!) {
		const entradaDb = evento.precios.find((t: any) => t.tipo == entrada.tipo);
		if (entradaDb && entrada.base && entrada.cantidad) {
			const precio = Number(entradaDb.base) * entrada.cantidad;
			precioReal += precio;
		}
	}

	const { data: token } = await axios.get(`${niubizapi}/api.security/v1/security`, {
		headers: {
			Authorization: credentials
		}
	});

	console.log('token', precioReal);

	const { data: session } = await axios.post(
		`${niubizapi}/api.ecommerce/v2/ecommerce/token/session/${merchantId}`,
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
		merchantid: merchantId,
		purchasenumber: Math.floor(new Date().getTime() / 10),
		amount: precioReal
	};

	const turno = {
		tenant: 'quehay',
		id: newId,
		compra: pago.purchasenumber,
		monto: precioReal,
		info: intencion
	};

	await locals.eventosRepo.postTurno(turno);

	return json({ ...pago, id: newId, niubizlib });
};
