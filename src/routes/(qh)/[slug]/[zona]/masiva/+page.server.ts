export const prerender = false;
export const ssr = false;

import { SECRET_SENDGRID_KEY, SECRET_SENDGRID_TICKET } from '$env/static/private';
import { redirect, type Actions } from '@sveltejs/kit';
import QRCode from 'qrcode';
import { MailService } from '@sendgrid/mail';
import { VentaManual } from '$lib/aplicacion/ventamanual';
import { letrar } from '$lib/utils/letrador';

export const load = async ({ locals, params }: { locals: App.Locals; params: Record<string, string> }) => {
	if (locals.user.rol == 'promotor') {
		const evento = await locals.eventosRepo.getEvento(params.slug);
		const zonaEvento: App.Precio = evento.precios.find((t: App.Precio) => t.tipo == params.zona);

		const ventaManual = new VentaManual(evento);
		const zona: App.Precio = ventaManual.tarificar(params.zona, zonaEvento.numerado ? zonaEvento.tope! : 1);

		return { evento, zona };
	} else {
		throw redirect(303, `../`);
	}
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const formulario = await request.formData();
		const formData = Object.fromEntries(formulario);
		const compra = JSON.parse(formData.payload.toString());

		const formDataCliente = { ...formData, payload: '' };
		const compraCliente = { ...compra, cliente: formDataCliente, formaPago: formData.formaPago };

		const evento = await locals.eventosRepo.findEvento(compra.evento.id);
		const generaQR = new VentaManual(evento).debeGenerarQR(compra.entradas[0].tipo, compra.entradas[0].cantidad);
		const vendedor = {
			nombre: locals.user.nombre,
			correo: locals.user.correo,
			apellido: locals.user.apellido,
			dni: locals.user.dni,
			id: locals.user.id
		};

		for (let index = 0; index < compraCliente.entradas[0].cantidad; index++) {
			const entrada = await locals.eventosRepo.ventaManual(
				params.slug,
				{
					...compraCliente,
					entradas: [
						{
							...compraCliente.entradas[0],
							cantidad: 1
						}
					]
				},
				vendedor
			);

			console.log(`https://www.quehay.pe/victormunoz/ticket/${entrada.id}`);
		}

		// throw redirect(303, `/${evento.slug}/ticket/${entrada.id}`);
	}
};
