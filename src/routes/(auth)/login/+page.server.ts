import type { Action, Actions, PageServerLoad } from './$types';

import { invalid, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {};

const login: Action = async ({ cookies, request, locals, url }) => {
	const data = await request.formData();
	const fbtoken: string = data.get('token')?.toString() ?? '';
	const displayName: string = data.get('displayName')?.toString() ?? '';
	const email: string = data.get('email')?.toString() ?? '';
	const photoURL: string = data.get('photoURL')?.toString() ?? '';
	const redirectTo: string = data.get('redirectTo')?.toString() ?? '';
	console.log('login redirect to', redirectTo);
	const user = await locals.usuariosRepo.findByFb(fbtoken);
	let userToken = '';

	if (user) {
		if (user.dni && user.dni.length > 0) {
			cookies.set('session', user.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30
			});
			throw redirect(302, redirectTo ? redirectTo : '/');
		} else {
			throw redirect(302, `/completar/${user.id}?redirectTo=${encodeURIComponent(redirectTo)}`);
		}
	} else {
		const newUser: App.User = {
			fbtoken,
			nombre: displayName,
			correo: email
		};
		userToken = await locals.usuariosRepo.create(newUser);

		throw redirect(302, `/completar/${userToken}?redirectTo=${encodeURIComponent(redirectTo)}`);
	}
};

export const actions: Actions = { default: login };
