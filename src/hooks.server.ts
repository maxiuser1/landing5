import type { Handle } from '@sveltejs/kit';
import { SECRET_DATABASE_URL } from '$env/static/private';
import { EventosRepo, UsuariosRepo, ContactosRepo } from './lib/repos';

export const handle = (async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(SECRET_DATABASE_URL);
	event.locals.usuariosRepo = new UsuariosRepo(SECRET_DATABASE_URL);
	event.locals.contactosRepo = new ContactosRepo(SECRET_DATABASE_URL);

	const response = await resolve(event);
	return response;
}) satisfies Handle;
