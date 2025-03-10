import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const entrada = await locals.eventosRepo.getEntrada(params.id!);
	return {
		entrada
	};
};
