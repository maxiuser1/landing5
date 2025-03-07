import { SECRET_DATABASE_URL } from '$env/static/private';
import { EventosRepo } from '$lib/repos/eventosRepo';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(SECRET_DATABASE_URL);
	const response = await resolve(event);
	return response;
};
