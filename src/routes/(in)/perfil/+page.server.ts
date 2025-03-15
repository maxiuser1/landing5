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
		return { success: true };
	}
} satisfies Actions;
