export const load = async ({ locals, params }) => {
	const evento = await locals.eventosRepo.getEventoConLocacion(params.slug);
	return { evento };
};
