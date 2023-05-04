import type { Action, Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	let ticket: App.Entrada = await locals.eventosRepo.getEntrada(params.id);
	return { ticket };
};

const completar: Action = async ({ request, locals, params }) => {
	let ticket: App.Entrada = await locals.eventosRepo.getEntrada(params.id);

	console.log('test');
	const data = await request.formData();
	const formData = Object.fromEntries(data);

	await locals.eventosRepo.picarEntrada(params.id, Number(formData.Cantidad));

	throw redirect(302, 'listo');
};

export const actions: Actions = { default: completar };
