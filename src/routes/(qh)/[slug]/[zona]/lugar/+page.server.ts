export const load = async ({ locals, params } : { locals: App.Locals; params: Record<string,string>}) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
    const zona = evento.precios.find((t:App.Precio) => t.tipo == params.zona);

	return { evento, zona };
};
