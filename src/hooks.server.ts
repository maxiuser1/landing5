import { ContactosRepo, EventosRepo, UsuariosRepo } from '$lib/repos';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(import.meta.env.VITE_DATABASE_URL);
	event.locals.usuariosRepo = new UsuariosRepo(import.meta.env.VITE_DATABASE_URL);
	event.locals.contactosRepo = new ContactosRepo(import.meta.env.VITE_DATABASE_URL);

	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await event.locals.usuariosRepo.findUsuario(session);

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};
