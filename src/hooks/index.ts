import { EventosRepo } from '$lib/repos';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const eventosRepo = new EventosRepo(
		'AccountEndpoint=https://encuestasdb.documents.azure.com:443/;AccountKey=jbUfTnFcRnprj1rKnuMxQXBsiJr4ph2MTxdyDWhKYHNZe0z0Et6ecKIkKnVOcY8uaWBTiPDG3BjBetDtj7lfpA=='
	);
	const dasd = await eventosRepo.getEventosDestacados();
	console.log('dasd', dasd);

	const response = await resolve(event);

	return response;
};
