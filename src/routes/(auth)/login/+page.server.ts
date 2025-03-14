import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const fbtoken: string = data.get('token')?.toString() ?? '';
		const displayName: string = data.get('displayName')?.toString() ?? '';
		const email: string = data.get('email')?.toString() ?? '';
		const photoURL: string = data.get('photoURL')?.toString() ?? '';
		const redirectTo: string = data.get('redirectTo')?.toString() ?? '';
		const user = await locals.usuariosRepo.findByFb(fbtoken);

		if (user) {
			if (user && user.dni && user.dni.length > 0) {
				redirect(302, redirectTo ? redirectTo : '/');
			}
		}
	},
	revalidate: async ({ locals, url, request, cookies }) => {
		if (locals.user) {
			if (url.searchParams.get('redirectTo')) {
				redirect(302, url.searchParams.get('redirectTo')!);
			}
			redirect(302, '/');
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
