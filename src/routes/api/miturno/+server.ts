import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request }) => {
	const intencion = (await request.json()) as App.Compra;
	console.log('intencion', intencion);

	const evento = await locals.eventosRepo.getEvento(intencion.evento.slug);

	console.log('evento', evento);

	const merchantId = import.meta.env.VITE_NIUBIZ_URL ?? 'nohay';
	const credentials = 'Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG';
	const niubizapi = 'https://apitestenv.vnforapps.com';
	const niubizlib = 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true';

	let precioReal: number = 0;

	for (let entrada of intencion.entradas!) {
		const entradaDb = evento.precios.find((t) => t.tipo == entrada.tipo);
		if (entradaDb && entrada.base && entrada.cantidad) {
			const precio = Number(entradaDb.base) * entrada.cantidad;
			precioReal += precio;
		}
	}

	return json({
		demo: merchantId
	});
};
