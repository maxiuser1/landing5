import { error, type Actions, redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const productos = await locals.tiendaRepo.getProductos(params.slug);

	if (productos) {
		return { evento, productos };
	}

	throw error(404, 'Not found');
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const formulario = await request.formData();
		const formData = Object.fromEntries(formulario);
		const compra = JSON.parse(formData.payload.toString());

		const formDataCliente = { ...formData, payload: '' };

		const newId = await locals.tiendaRepo.getNewId();
		await locals.tiendaRepo.guardarCompra({
			tenant: 'vilmapalma',
			id: newId,
			cliente: formDataCliente,
			pedido: {
				info: { ...compra }
			},
			fecha: new Date()
		});

		throw redirect(303, `listo`);
	}
};
