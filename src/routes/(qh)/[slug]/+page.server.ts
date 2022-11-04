import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	// if (!locals.user) {
	// 	console.log('no hay usua');
	// 	throw redirect(303, '/login');
	// }
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento };
};
