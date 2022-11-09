import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		console.log('a', formData);
		return { success: true };
	}
};
