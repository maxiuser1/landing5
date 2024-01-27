import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	console.log('grrrrr', params.slug);
	return {
		user: locals.user,
		enEvento: params.slug ? false : true
	};
};
