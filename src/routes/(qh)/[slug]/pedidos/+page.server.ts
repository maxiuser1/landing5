import { redirect, type Action, type Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const compras = await locals.tiendaRepo.getCompras(params.slug);

	return { evento, compras };
};

const completar: Action = async ({ request, locals, params }) => {
	const data = await request.formData();
	const formData = Object.fromEntries(data);

	console.log('foi', formData);

	await locals.tiendaRepo.cerrarCompra(formData.numero);

	throw redirect(302, '/vilmapalma/pedidos');
};

export const actions: Actions = { default: completar };