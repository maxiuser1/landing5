import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		const urlLogin = `/login?redirectTo=${encodeURIComponent(url.href)}`;
		redirect(302, urlLogin);
	}

	const evento = await locals.eventosRepo.getEvento(params.slug);
	const comercios = await locals.eventosRepo.getComercios(['anima1', 'losportales1', 'lalucha1']);
	return { evento, comercios };
};

export const ssr = false;
