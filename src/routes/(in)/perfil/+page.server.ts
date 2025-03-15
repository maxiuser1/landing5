import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, request, locals }) => {};

export const actions = {
	default: async ({ request, locals, url }) => {
		const data = await request.formData();
		await locals.usuariosRepo.edit(locals.user!.id!, {
			nombre: data.get('nombre') as string,
			apellido: data.get('apellido') as string,
			ciudad: data.get('ciudad') as string,
			telefono: data.get('telefono') as string,
			dni: data.get('dni') ? (data.get('dni') as string) : ''
		});

		if (data.get('dni')) {
			locals.user.dni = data.get('dni') as string;
		}
		locals.user.nombre = data.get('nombre') as string;
		locals.user.apellido = data.get('apellido') as string;
		locals.user.ciudad = data.get('ciudad') as string;
		locals.user.telefono = data.get('telefono') as string;

		if (url.searchParams.has('redirectTo')) {
			redirect(303, url.searchParams.get('redirectTo')!);
		}

		return { success: true };
	}
} satisfies Actions;
