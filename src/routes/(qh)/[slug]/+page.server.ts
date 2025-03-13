import createClient from '$lib/shared/prismic';
import { formatDate } from '$lib/shared/formatos';
import type { PageServerLoad } from './$types';
import { getParrilla } from '$lib/components/Evento/Portada/parrilla';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params, fetch, request }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	if (evento) {
		const client = createClient({ fetch, request });
		const document = await client.getByUID('legal', params.slug.toLowerCase());
		let parrilla: App.ParrillaPrecio = getParrilla(evento);
		return { evento, document, parrilla };
	} else {
		error(404, 'Evento no encontrado');
	}
};
