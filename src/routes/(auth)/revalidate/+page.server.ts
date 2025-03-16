import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = url.searchParams.get('token');
	const user = await locals.usuariosRepo.findUsuario(session);
	if (user) {
		locals.user = user;
	}
	redirect(302, '/');
};
