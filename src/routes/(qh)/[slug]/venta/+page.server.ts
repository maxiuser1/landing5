import { redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento };
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const formulario = await request.formData();
		const formData = Object.fromEntries(formulario);
		const compra = JSON.parse(formData.payload.toString());

		const formDataCliente = { ...formData, payload: '' };
		const compraCliente = { ...compra, cliente: formDataCliente };

		const vendedor = {
			nombre: locals.user.nombre,
			correo: locals.user.correo,
			apellido: locals.user.apellido,
			dni: locals.user.dni,
			id: locals.user.id
		};

		const entrada = await locals.eventosRepo.ventaManual(params.slug, compraCliente, vendedor);

		throw redirect(303, `/ticket/${entrada.id}`);
	}
};
