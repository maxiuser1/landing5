export const load = async ({ locals, params }) => {
	console.log('params.id', params.id);
	let ticket: App.Entrada = await locals.eventosRepo.getEntrada(params.id);

	console.log('ticket', ticket);

	return { ticket };
};
