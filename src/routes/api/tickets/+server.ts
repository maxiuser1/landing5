import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const ticketSet = (await request.json()) as App.TicketsSet;
	locals.eventosRepo.ticketear(ticketSet);
	return json({ ok: true });
};
