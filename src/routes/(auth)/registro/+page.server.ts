import { redirect } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

const completar: Action = async ({ cookies, request, locals, params }) => {
	const formData = Object.fromEntries(await request.formData());
	const userToken = await locals.usuariosRepo.create(formData);

	cookies.set('session', userToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30
    });

    throw redirect(302, '/');
};

export const actions: Actions = { default: completar };
