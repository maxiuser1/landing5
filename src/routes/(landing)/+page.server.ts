export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const eventos = await locals.eventosRepo.getEventosDestacados();
	return { eventos, banners: eventos.filter((t) => (t.banner ? true : false)) };
};
