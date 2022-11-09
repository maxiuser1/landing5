import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		return { success: true };
	}
};
