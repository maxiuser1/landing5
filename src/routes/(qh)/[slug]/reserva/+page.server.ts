import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		const urlLogin = `/login?redirectTo=${encodeURIComponent(url.href)}`;
		redirect(302, urlLogin);
	}
	const comercios = await locals.eventosRepo.getComercios(['anima1', 'losportales1', 'lalucha1']);
	const evento = await locals.eventosRepo.getEvento(params.slug);

	let descuento: App.User | null = null;
	if (url.searchParams.has('promo') && url.searchParams.get('promo')) {
		const promo = url.searchParams.get('promo');
		descuento = await locals.usuariosRepo.getPromo(promo!);
	}

	return { evento, comercios, descuento };
};

export const ssr = false;
