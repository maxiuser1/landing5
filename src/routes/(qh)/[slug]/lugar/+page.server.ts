export const load = async ({ locals, params }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	console.log('evento', evento);
	return { evento };
};
