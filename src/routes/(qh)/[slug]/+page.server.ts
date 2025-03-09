import createClient from '$lib/repos/prismic';
import { formatDate } from '$lib/shared/fechas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params, fetch, request }) => {
	const client = createClient({ fetch, request });
	const document = await client.getByUID('legal', params.slug.toLowerCase());
	const evento = await locals.eventosRepo.getEvento(params.slug);

	let parrilla: App.ParrillaPrecio = {
		titulos: [],
		items: []
	};
	if (evento && evento.precios) {
		const preventas = evento.precios
			.filter((t) => t.descuentos && t.descuentos?.length > 0)
			.map((t) => t.descuentos!)
			.flat();
		const preventasOrdenadas = preventas
			.filter((t) => t.habilitado && t.tipo == 'Pre-Venta')
			.sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));
		const preventasUnicas = new Set(preventasOrdenadas.map((t) => t.nombre));

		for (const preventa of preventasUnicas) {
			const preventaMuestra = preventas.find((t) => t.nombre == preventa);
			parrilla.titulos.push({
				desde: formatDate(new Date(preventaMuestra!.fechaInicio)),
				hasta: formatDate(new Date(preventaMuestra!.fechaLimite)),
				label: preventa
			});
		}

		for (const zona of evento.precios) {
			let itemParrilla: App.ItemParrillaPrecio = {
				zona: zona.nombre!,
				items: []
			};

			for (const preventa of preventasUnicas) {
				const descuento = zona.descuentos?.find((t) => t.nombre == preventa);
				if (descuento) {
					const today = new Date();
					const fechaInicio = new Date(descuento.fechaInicio);
					const fechaLimite = new Date(descuento.fechaLimite);

					itemParrilla.items.push({
						habilitado: today >= fechaInicio && today <= fechaLimite,
						precio: descuento.online
					});
				} else {
					itemParrilla.items.push({
						habilitado: true,
						precio: null
					});
				}
			}

			itemParrilla.items.push({
				habilitado: true,
				precio: zona.online
			});

			parrilla.items.push(itemParrilla);
		}
	}

	return { evento, document, parrilla };
};
