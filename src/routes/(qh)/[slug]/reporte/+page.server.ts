export const prerender = false;
export const ssr = false;

import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	if (locals.user.rol == 'promotor') {
		const evento = await locals.eventosRepo.getEvento(params.slug);
		const entradas = await locals.entradasRepo.getReporte(params.slug);
		return { evento, entradas };
	} else {
		throw redirect(303, `../`);
	}
};
