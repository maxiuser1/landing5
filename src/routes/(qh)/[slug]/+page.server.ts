import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params, url }: { locals: App.Locals; params: Record<string, string>; url: URL }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento };
};
