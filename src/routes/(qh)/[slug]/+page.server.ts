import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento };
};
