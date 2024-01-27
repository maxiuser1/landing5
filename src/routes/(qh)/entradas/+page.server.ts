import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const entradas = await locals.entradasRepo.getEntradas(locals.user.id, locals.user.correo);

	return {
		entradas
	};
}) satisfies PageServerLoad;

export const actions = {
	traspaso: async ({ request, locals }) => {
		const data = await request.formData();
		const email = data.get('email');

		const transferible = await locals.usuariosRepo.findByCorreo(email);

		return { success: true, user: transferible };
	},
	traspasar: async ({ request, locals }) => {
		const { entradaId, transferableId } = Object.fromEntries(await request.formData()) as Record<string, string>;
		await locals.entradasRepo.traspasar(entradaId, transferableId);
		return { success: true };
	}
} satisfies Actions;
