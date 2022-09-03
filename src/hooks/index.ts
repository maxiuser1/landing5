import { EventosRepo } from '$lib/repos';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(import.meta.env.VITE_DATABASE_URL);

	const response = await resolve(event);

	return response;
};
