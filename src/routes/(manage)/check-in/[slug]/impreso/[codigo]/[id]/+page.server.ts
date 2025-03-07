import type { Action, Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const ticket: App.Entrada = await locals.eventosRepo.getEntradasPorNumero(params.slug, params.codigo, params.id);

	if (ticket && ticket.impresos) {
		const currentImpreso = ticket.impresos.find((t: any) => t.n.endsWith(params.id));
		return { ticket, numero: params.id, picado: currentImpreso!.p == 1 };
	}

	return { ticket: null, numero: 0, picado: false };
};

const completar: Action = async ({ request, locals, params }) => {
	const ticket: App.Entrada = await locals.eventosRepo.getEntradasPorNumero(params.slug, params.codigo, params.id);

	const data = await request.formData();
	const formData = Object.fromEntries(data);

	await locals.eventosRepo.picarEntradaFisica(ticket, params.id);

	throw redirect(302, 'listo');
};

export const actions: Actions = { default: completar };
