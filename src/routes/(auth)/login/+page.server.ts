import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request, locals }) => {
		console.log('login called');
		const data = await request.formData();
		const fbtoken: string = data.get('token')?.toString() ?? '';
		const nombre: string = data.get('displayName')?.toString() ?? '';
		const correo: string = data.get('email')?.toString() ?? '';
		const avatar: string = data.get('photoURL')?.toString() ?? '';
		const redirectTo: string = data.get('redirectTo')?.toString() ?? '';
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
	},

	revalidate: async ({ locals, url, request, cookies }) => {
		console.log('revalidte called');
		if (locals.user) {
			if (url.searchParams.has('redirectTo')) {
				redirect(303, url.searchParams.get('redirectTo')!);
			}
			redirect(303, '/');
		}

		const data = await request.formData();
		const user = await locals.usuariosRepo.findByFb(data.get('uid')?.toString());
		if (user) {
			cookies.set('session', user.id!, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30
			});
			redirect(302, '/');
		}
	}
} satisfies Actions;
