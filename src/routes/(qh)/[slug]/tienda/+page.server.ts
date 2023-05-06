import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const productos = await locals.tiendaRepo.getProductos(params.slug);

	console.log('productos', productos);
	if (productos) {
		return { evento, productos };
	}

	throw error(404, 'Not found');
};
