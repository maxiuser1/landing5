import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const user = Object.fromEntries(data);
		console.log('data', data);
		console.log('user', user);

		return { success: true };
	}
} satisfies Actions;
