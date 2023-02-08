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
	const pedido = data.get('pedido');
	const evento = data.get('evento');
	const motivo = data.get('motivo');

	await locals.contactosRepo.create({
		nombres,
		apellidos,
		documento,
		dni,
		correo,
		telefono,
		detalle,
		pedido,
		evento,
		motivo,
		tipo: 'reclamacion'
	});

	return { success: true };
};

export const actions: Actions = { default: postear };
