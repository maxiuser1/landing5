import { SECRET_DATABASE_URL } from '$env/static/private';
import { ContactosRepo, EventosRepo, UsuariosRepo } from '$lib/repos';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(SECRET_DATABASE_URL);
	event.locals.usuariosRepo = new UsuariosRepo(SECRET_DATABASE_URL);
	event.locals.contactosRepo = new ContactosRepo(SECRET_DATABASE_URL);

	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await event.locals.usuariosRepo.findUsuario(session);
	console.log('user', user);
	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};
