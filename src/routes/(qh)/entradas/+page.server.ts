import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('userid', locals.user.id);
	const entradas = await locals.entradasRepo.getEntradas(locals.user.id);

	console.log('entrada', entradas);

	return {
		entradas
	};
}) satisfies PageServerLoad;
