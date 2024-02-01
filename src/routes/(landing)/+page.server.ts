export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	return { eventos };
};
