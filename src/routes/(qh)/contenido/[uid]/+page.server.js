import createClient from '$lib/prismicio';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	const { uid } = params;
	const client = createClient({ fetch });
	const document = await client.getByUID('contenido', uid);

	if (document) {
		return { document };
	}

	error(404, 'Not found');
}
