import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	registro: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const fbtoken: string = data.get('fbtoken')?.toString() ?? '';
		const redirectTo: string = data.get('redirectTo')?.toString() ?? '';
		const nombres: string = data.get('nombre')?.toString() ?? '';
		const apellido: string = data.get('apellido')?.toString() ?? '';
		
		const nombre = nombres + ' ' + apellido;

		const correo: string = data.get('correo')?.toString() ?? '';
		const avatar: string = data.get('avatar')?.toString() ?? '';

		const user = await locals.usuariosRepo.findByFb(fbtoken);
		
		const redirigir = (userId: string, goPerfil: boolean, redirectTo: string) => {
			cookies.set('session', userId, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30
			});
			if (goPerfil) redirect(302, `/perfil?redirectTo=${encodeURIComponent(redirectTo)}`);
			else redirect(302, redirectTo ? redirectTo : '/');
		};

		if (user) {
			redirigir(user.id!, !user.dni, redirectTo);
		} else {
			const userId = await locals.usuariosRepo.create({ fbtoken, nombre, correo, avatar });
			redirigir(userId, true, redirectTo);
		}
	}
} satisfies Actions;
