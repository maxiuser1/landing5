import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.set('session', '', {
		path: '/',
		expires: new Date(0)
	});
	return {
		loggedout: true
	};
};
