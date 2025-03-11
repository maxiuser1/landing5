import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	console.log('entrada page', params.id);
	const entrada = await locals.eventosRepo.getEntrada(params.id);
	const evento = await locals.eventosRepo.getEvento(entrada.slug);
	return {
		entrada,
		evento
	};
};
