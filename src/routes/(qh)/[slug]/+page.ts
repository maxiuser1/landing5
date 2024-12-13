import createClient from '$lib/prismicio';

export const load = async ({ data, fetch, params }) => {
	const client = createClient({ fetch });
	const prismicuid = data.evento.general.categoria == 'Tours' || data.evento.general.categoria == 'Descuentos' || data.evento.general.slug == 'mistica' ? params.slug : 'conciertos_default';
	const document = await client.getByUID('consideraciones', prismicuid);
	return { ...data, document };
};
