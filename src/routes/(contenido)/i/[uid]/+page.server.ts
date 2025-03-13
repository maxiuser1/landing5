import createClient from '$lib/shared/prismic';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, request, params }) => {
	const { uid } = params;
	const client = createClient({ fetch, request });
	const document = await client.getByUID('contenido', uid);
	if (document) {
		return { document };
	}
	error(404, 'Not found');
};
