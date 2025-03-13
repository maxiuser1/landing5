import { json, type RequestHandler } from '@sveltejs/kit';
import { NiubizHandler } from '$lib/shared/niubiz';

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
	const newTurno = await locals.eventosRepo.postTurno(turno);
	const niubizConfig = await new NiubizHandler().getSession(newTurno, locals.user);
	return json(niubizConfig);
};
