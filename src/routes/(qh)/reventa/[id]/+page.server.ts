import { NiubizHandler } from '$lib/shared/niubiz';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals, params, url }) => {
		const parameters = decodeURIComponent(await request.text());
		const transaction = Object.fromEntries(new URLSearchParams(parameters));
		const turno = await locals.eventosRepo.getTurno(params.id!);
		const authorization = await new NiubizHandler().authorize(transaction.transactionToken, turno);
		const entradaId = await locals.eventosRepo.confirmarReventa(turno, authorization);
		redirect(303, `/entrada/${entradaId}`);
	}
} satisfies Actions;
