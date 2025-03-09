import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento };
};
