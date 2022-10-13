import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// eat the cookie
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0)
	});
};

export const actions: Actions = {
	default({ cookies }) {
		// eat the cookie
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});
	}
};
