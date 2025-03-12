import createClient from '$lib/shared/prismic';
import { formatDate } from '$lib/shared/formatos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, fetch, request }) => {
	const client = createClient({ fetch, request });
	const document = await client.getByUID('legal', params.slug.toLowerCase());
	const evento = await locals.eventosRepo.getEvento(params.slug);

	// let parrilla: App.ParrillaPrecio = getParrilla(evento);

	return {
		evento: locals.eventosRepo.getEvento(params.slug),
		document
	};
};
