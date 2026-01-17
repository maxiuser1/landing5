import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		const urlLogin = `/login?redirectTo=${encodeURIComponent(url.href)}`;
		redirect(302, urlLogin);
	}

	const evento = await locals.eventosRepo.getEvento(params.slug);
	const comercios = (await locals.eventosRepo.getComercios(evento.tiendas ?? [])) ?? [];

	let descuento: App.User | null = null;
	if (url.searchParams.has('promo') && url.searchParams.get('promo')) {
		const promo = url.searchParams.get('promo');
		descuento = await locals.usuariosRepo.getPromo(promo!);
	}

	console.log(comercios);
	return { evento, comercios, descuento };
};

export const ssr = false;
