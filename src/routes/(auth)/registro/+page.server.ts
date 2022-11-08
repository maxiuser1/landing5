import type { Action, Actions } from './$types';

const completar: Action = async ({ cookies, request, locals, params }) => {
	const formData = Object.fromEntries(await request.formData());

	console.log('formdata', formData);
};

export const actions: Actions = { default: completar };
