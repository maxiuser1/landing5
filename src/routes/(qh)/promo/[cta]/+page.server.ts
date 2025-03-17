import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	console.log('mercado', params.cta);
	if (params.cta) redirect(303, '/?promo=' + params.cta);
	else redirect(303, '/');
};
