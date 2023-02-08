import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request, getClientAddress }) => {
	const clientIpAddress = getClientAddress();
	const payload = (await request.json());
    const error = payload;
    const event = {
        clientIpAddress,
        tipo:"ce",
        locals
    };
    locals.usuariosRepo.log( event, error);

	return json({ ok:true});
};
