import type { Action, Actions, PageServerLoad } from './$types';

const postear: Action = async ({ request, locals }) => {
	const data = await request.formData();
	const nombres = data.get('nombres');
	const apellidos = data.get('apellidos');
	const documento = data.get('documento');
	const dni = data.get('dni');
	const correo = data.get('correo');
	const telefono = data.get('telefono');
	const detalle = data.get('detalle');

	await locals.contactosRepo.create({
		nombres,
		apellidos,
		documento,
		dni,
		correo,
		telefono,
		detalle,
		tipo: 'contacto'
	});

	return { success: true };
};

export const actions: Actions = { default: postear };
