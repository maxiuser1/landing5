import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	console.log('grrrrr', params.slug, params.slug != undefined ? true : false);
	return {
		user: locals.user,
		enEvento: params.slug != undefined ? true : false
	};
};
