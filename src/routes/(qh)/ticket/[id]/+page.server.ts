export const load = async ({ locals, params }) => {
	const ticket = await locals.eventosRepo.getEntrada(params.id);
	return { ticket };
};