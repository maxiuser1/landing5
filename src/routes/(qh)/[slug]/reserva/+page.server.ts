import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const comercios = await locals.eventosRepo.getComercios(['anima1', 'losportales1', 'lalucha1']);
	return { evento, comercios };
};

export const ssr = false;
