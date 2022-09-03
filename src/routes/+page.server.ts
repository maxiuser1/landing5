import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { eventosRepo } }) => {
	const eventos = await eventosRepo.getEventosDestacados();
	return { eventos };
};
