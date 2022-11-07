export const load = async ({ locals, params, getClientAddress }) => {
	const clientAddress = getClientAddress();
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento, clientAddress };
};
