import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, request, locals }) => {
	const categorias = await locals.usuariosRepo.getCategories();
	return {
		categorias
	};
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();

		await locals.usuariosRepo.edit(locals.user!.id!, {
			nombre: data.get('nombre') as string,
			apellido: data.get('apellido') as string,
			ciudad: data.get('ciudad') as string,
			telefono: data.get('telefono') as string,
			dni: data.get('dni') ? (data.get('dni') as string) : '',
			favoritos: data.get('categoriesval') ? (data.get('categoriesval') as string).split(',') : []
		});

		if (data.get('dni')) {
			locals.user.dni = data.get('dni') as string;
		}
		locals.user.nombre = data.get('nombre') as string;
		locals.user.apellido = data.get('apellido') as string;
		locals.user.ciudad = data.get('ciudad') as string;
		locals.user.telefono = data.get('telefono') as string;
		locals.user.favoritos = data.get('categoriesval') ? (data.get('categoriesval') as string).split(',') : [];
		if (url.searchParams.has('redirectTo')) {
			redirect(303, url.searchParams.get('redirectTo')!);
		}

		return { success: true };
	}
} satisfies Actions;
