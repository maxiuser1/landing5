import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const tickets = (await request.json()) as App.Ticket[];
	return json({ ko: 'true' });
};
