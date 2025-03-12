import createClient from '$lib/shared/prismic';
import { formatDate } from '$lib/shared/formatos';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, fetch, request }) => {
	return {
		evento: locals.eventosRepo.getEvento(params.slug),
		document: createClient({ fetch, request }).getByUID('legal', params.slug.toLowerCase())
	};
};
