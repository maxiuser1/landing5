import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
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

		return { success: true };
	}
} satisfies Actions;
