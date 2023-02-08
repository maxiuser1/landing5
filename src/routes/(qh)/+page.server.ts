import type { PageServerLoad } from './$types';

export const load = async ({ locals }: { locals: App.Locals }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	return { eventos };
};
