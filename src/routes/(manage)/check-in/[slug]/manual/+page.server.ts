import type { Action, Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

const completar: Action = async ({ request, locals, params }) => {
	const data = await request.formData();
	const formData = Object.fromEntries(data);

	console.log('www', formData);

	if (formData.BOX != undefined) {
		let payload = {
			tenant: 'urban',
			numero: formData.numero,
			tipo: 'SUPER'
		};
		await locals.eventosRepo.guardarIngreso(payload);
	}

	if (formData.GENERAL != undefined) {
		let payload = {
			tenant: 'urban',
			numero: formData.numero,
			tipo: 'GENERAL'
		};
		await locals.eventosRepo.guardarIngreso(payload);
	}

	if (formData.VIP != undefined) {
		let payload = {
			tenant: 'urban',
			numero: formData.numero,
			tipo: 'VIP'
		};
		await locals.eventosRepo.guardarIngreso(payload);
	}

	throw redirect(302, 'listo');
};

export const actions: Actions = { default: completar };
