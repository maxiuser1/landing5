import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const parameters = decodeURIComponent(await request.text());
		console.log('parameters1', parameters);

		redirect(303, '/');
	}
} satisfies Actions;
