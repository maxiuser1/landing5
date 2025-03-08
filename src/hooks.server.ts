import { SECRET_DATABASE_URL } from '$env/static/private';
import { EventosRepo } from '$lib/repos/eventosRepo';
import { UsuariosRepo } from '$lib/repos/usuariosRepo';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(SECRET_DATABASE_URL);
	event.locals.usuariosRepo = new UsuariosRepo(SECRET_DATABASE_URL);

	const session = event.cookies.get('session');

	if (!session) {
		const response = await resolve(event);
		return response;
	} else {
		const user = await event.locals.usuariosRepo.findUsuario(session);
		if (user) {
			event.locals.user = user;
		}
		const response = await resolve(event);
		return response;
	}
};
