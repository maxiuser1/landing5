import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, request }) => {
    const ticketSet: any = (await request.json());

    await locals.eventosRepo.picarEntrada(ticketSet.id, ticketSet.compra, ticketSet.tipo);
    console.log(ticketSet);
    return json({ ok: true });
};
