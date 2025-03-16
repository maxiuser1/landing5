import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const entradas = await locals.usuariosRepo.getEntradas(locals.user!.id!, locals.user.correo);
	return { entradas };
};
