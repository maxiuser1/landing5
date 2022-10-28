
import { redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';


export const load = async ({ locals, params }) => {
    const user = await locals.usuariosRepo.findUsuario(params.token);
	return { user };
};

const completar: Action = async ({ cookies, request, locals, params }) => {
    const formData = Object.fromEntries(await request.formData());
    await locals.usuariosRepo.complete(params.token, formData );

    cookies.set('session', params.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30
    });

    throw redirect(302, '/');
};

export const actions: Actions = { default: completar };