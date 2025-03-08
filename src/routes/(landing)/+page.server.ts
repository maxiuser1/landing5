import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	const banners = eventos ? eventos.filter((t) => t.banner) : [];
	return {
		eventos,
		banners
	};
};
