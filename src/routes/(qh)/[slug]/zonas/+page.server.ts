export const load = async ({ locals, params } : { locals: App.Locals; params: Record<string,string>}) => {
	const evento = await locals.eventosRepo.getEventoConLocacion(params.slug);
	return { evento };
};
