import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const reventas = await locals.eventosRepo.getReventas();
	return {
		reventas,
		slug: params.slug
	};
};
