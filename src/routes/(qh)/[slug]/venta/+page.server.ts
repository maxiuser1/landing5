import type { Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	return { evento };
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const wtt = JSON.parse(formData.payload.toString());
		console.log('b', wtt);
		return { success: true };
	}
};
