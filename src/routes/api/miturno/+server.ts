import { json, type RequestHandler } from '@sveltejs/kit';
import { SECRET_NIUBIZ_MERCHANTID, SECRET_NIUBIZ_CREDENTIALS, SECRET_NIUBIZ_NIUBIZAPI, SECRET_NIUBIZ_NIUBIZLIB } from '$env/static/private';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { VentaOnline } from '$lib/aplicacion/ventaonline';
import { user } from '$lib/stores/userstore';

export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	const clientIpAddress = getClientAddress();
	const estoPayload = (await request.json()) as App.Esto;

	const evento = await locals.eventosRepo.findEvento(estoPayload.evento.id);
	const intencion = {
		...estoPayload,

		entradas: estoPayload.entradas.filter((t) => t.cantidad > 0)
	};

	const ventaOnline = new VentaOnline(evento);

	let precioReal: number = 0;

	for (let entrada of intencion?.entradas.filter((t) => t?.cantidad > 0) ?? []) {
		const entradaDb = ventaOnline.tarificarEntrada(entrada.tipo, entrada.cantidad, entrada);
		if (entradaDb.numerado) {
			const final = entrada.cantidad * entradaDb.online;
			precioReal += final;
		} else {
			precioReal += entradaDb.final!;
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
		clientIpAddress: clientIpAddress,
		fecha: new Date(),
		user: {
			nombre: locals.user.nombre,
			correo: locals.user.correo,
			apellido: locals.user.apellido,
			dni: locals.user.dni,
			id: locals.user.id
		}
	};

	await locals.eventosRepo.postTurno(turno);

	return json({ ...pago, id: newId, niubizlib: SECRET_NIUBIZ_NIUBIZLIB });
};
