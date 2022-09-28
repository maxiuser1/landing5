export const load = async ({ locals }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	return { eventos };
};
