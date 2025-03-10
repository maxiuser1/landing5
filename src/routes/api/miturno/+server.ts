import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	const intencion = (await request.json()) as App.IntencionCompra;
	const turno: App.Turno = {
		...intencion,
		id: '',
		numeroCompra: '',
		user: {
			nombre: locals.user?.nombre,
			correo: locals.user?.correo,
			apellido: locals.user?.apellido,
			dni: locals.user?.dni,
			id: locals.user?.id,
			fbtoken: locals.user?.fbtoken
		},
		fecha: new Date().toISOString(),
		clientIpAddress: getClientAddress()
	};
	const id = await locals.eventosRepo.postTurno(turno);
	return json(id);
};
