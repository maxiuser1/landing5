export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const compras = await locals.tiendaRepo.getCompras(params.slug);

	return { evento, compras };
};
