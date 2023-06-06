import { redirect, type Action, type Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const compras = await locals.tiendaRepo.getCompras(params.slug);

	return { evento, compras };
};

const completar: Action = async ({ request, locals, params }) => {
	const data = await request.formData();
	const formData = Object.fromEntries(data);

	await locals.tiendaRepo.cerrarCompra(params.slug, formData.numero);

	throw redirect(302, '/urban/pedidos');
};

export const actions: Actions = { default: completar };
