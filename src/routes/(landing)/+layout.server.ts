import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	const banners = eventos ? eventos.filter((t) => t.banner) : [];
	return {
		eventos,
		banners
	};
};
