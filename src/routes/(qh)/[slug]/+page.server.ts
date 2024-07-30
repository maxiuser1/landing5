import { error } from '@sveltejs/kit';
import createClient from '$lib/prismicio';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEventoConLocacion(params.slug);

	if (evento && evento.publicado && evento.publicado == true) {
		return { evento };
	}

	throw error(404, 'Not found');
};
