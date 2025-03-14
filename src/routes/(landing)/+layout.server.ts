import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ locals }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	const banners = eventos ? eventos.filter((t) => t.banner) : [];
	const categorias = new Set(eventos?.map((t) => t.categoria));
	return {
		eventos,
		banners,
		categorias,
		user: locals.user
	};
};
