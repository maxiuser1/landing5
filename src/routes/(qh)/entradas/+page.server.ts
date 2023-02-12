import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('userid', locals.user.id);
	const entradas = await locals.entradasRepo.getEntradas(locals.user.id);

	return {
		entradas
	};
}) satisfies PageServerLoad;

export const actions = {
	traspaso: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email');

		const transferible = await locals.usuariosRepo.findByCorreo(email);

		console.log('email', transferible);
		return { success: true, user: transferible };
	}
} satisfies Actions;
