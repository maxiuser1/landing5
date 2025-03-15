import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const reventas = await locals.eventosRepo.getReventas();

	return {
		reventas
	};
};
