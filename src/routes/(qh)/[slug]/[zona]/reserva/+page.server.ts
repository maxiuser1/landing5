import { VentaOnline } from "$lib/aplicacion/ventaonline";
import { zonas } from "$lib/components/Evento/zonas";

export const load = async ({ locals, params } : { locals: App.Locals; params: Record<string,string>}) => {
	const evento = await locals.eventosRepo.getEvento(params.slug);
	const zonaEvento : App.Precio  = evento.precios.find((t:App.Precio) => t.codigo == params.zona);

	const ventaOnline = new VentaOnline(evento);
    const zona : App.Precio = ventaOnline.tarificar(params.zona, zonaEvento.numerado? zonaEvento.tope!: 1);

	return { evento, zona };
};
