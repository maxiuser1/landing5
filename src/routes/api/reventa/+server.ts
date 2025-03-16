import { json, type RequestHandler } from '@sveltejs/kit';
import { NiubizHandler } from '$lib/shared/niubiz';

export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	const intencion = (await request.json()) as App.IntencionReventa;

	// flat compras que sean del tipoPrecio General
	const generalUnicas = new Set(
		intencion.compras.filter((t) => t.compra.tipoPrecio == 'General').map((c) => c.compra.codigo)
	);

	let compras: App.ItemCompra[] = intencion.compras.map((c) => {
		return {
			...c.compra,
			cantidad: c.cantidad,
			precio: c.precio,
			total: c.precio * c.cantidad,
			refEntradaId: c.entradaId,
			refTicketId: c.ticketId
		};
	});

	const turno: App.Turno = {
		tipo: 'Reventa',
		compras,
		slug: intencion.slug,
		total: intencion.total,
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
	const niubizConfig = await new NiubizHandler().getSession(newTurno, locals.user, 'reventa');
	return json(niubizConfig);
};
