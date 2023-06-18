import type { Handle } from '@sveltejs/kit';
import { SECRET_DATABASE_URL } from '$env/static/private';
import { EventosRepo, UsuariosRepo, ContactosRepo } from './lib/repos';
import { EntradasRepo } from '$lib/repos/entradasRepo';
import { TiendaRepo } from '$lib/repos/tiendaRepo';

export const handle = (async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(SECRET_DATABASE_URL);
	event.locals.usuariosRepo = new UsuariosRepo(SECRET_DATABASE_URL);
	event.locals.contactosRepo = new ContactosRepo(SECRET_DATABASE_URL);
	event.locals.entradasRepo = new EntradasRepo(SECRET_DATABASE_URL);
	event.locals.tiendaRepo = new TiendaRepo(SECRET_DATABASE_URL);

	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await event.locals.usuariosRepo.findUsuario(session);

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
}) satisfies Handle;
