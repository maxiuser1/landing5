import { NiubizHandler } from '$lib/shared/niubiz';
import { redirect, type Actions } from '@sveltejs/kit';
import { SECRET_SENDGRID_KEY, SECRET_SENDGRID_TICKET } from '$env/static/private';
import sgMail from "@sendgrid/mail";

export const actions = {
	default: async ({ request, locals, params, url }) => {
		const parameters = decodeURIComponent(await request.text());
		const transaction = Object.fromEntries(new URLSearchParams(parameters));
		const turno = await locals.eventosRepo.getTurno(params.id!);
		const evento = await locals.eventosRepo.getEvento(turno.slug);
		const authorization = await new NiubizHandler().authorize(transaction.transactionToken, turno);
		const entradaId = await locals.eventosRepo.confirmar(turno, authorization);


		const fecha = new Date(evento.fechas.fechaUnica);

		const dia = String(fecha.getUTCDate()).padStart(2, "0");
		const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
		const anio = fecha.getUTCFullYear();

		const compraTicket = turno.compras.find(c => c.tipo === 'entrada');

		sgMail.setApiKey(SECRET_SENDGRID_KEY);
		const msg  = {
			to: turno.user.correo,
			from: 'contacto@eventop.pe',
			templateId: SECRET_SENDGRID_TICKET,
			dynamicTemplateData: {
				evento: evento.general.nombre,
				artista: evento.general.artista,
				fecha: `${dia}-${mes}-${anio}`,
				direccion:`${evento.ubicacion.nombre} - ${evento.ubicacion.direccion}`,
				zona: compraTicket?.nombre,
				cantidad:compraTicket?.cantidad,
			}
		}
		try {
			sgMail
			.send(msg)
			.then((response) => {
			})
			.catch((error) => {
				console.error(error)
			});
		}
		catch (error) {
		}
		

		redirect(303, `/entrada/${entradaId}`);
	}
} satisfies Actions;
