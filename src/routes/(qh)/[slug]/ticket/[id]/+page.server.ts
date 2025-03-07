import { SECRET_SENDGRID_KEY, SECRET_SENDGRID_TICKET } from '$env/static/private';

import QRCode from 'qrcode';
import { MailService } from '@sendgrid/mail';
import type { Action, Actions } from '@sveltejs/kit';
import { VentaManual } from '$lib/aplicacion/ventamanual';

export const load = async ({ locals, params }) => {
	let ticket: App.Entrada = await locals.eventosRepo.getEntrada(params.id);
	const evento = await locals.eventosRepo.findEvento(ticket.evento.id);
	const zona = evento.precios.find((t: App.Precio) => t.codigo == ticket.entradas![0].codigo);

	const vieneTipoQR = ticket.cliente && ticket.cliente.tipo && ticket.cliente.tipo == 'qr';
	const generaQR = ticket.canal === 'WEB' || vieneTipoQR ? true : new VentaManual(evento).debeGenerarQR(ticket.entradas![0].codigo!, ticket.entradas![0].cantidad);

	if (generaQR) {
		var opts: any = {
			errorCorrectionLevel: 'H',
			type: 'image/jpeg',
			quality: 0.3,
			margin: 1,
			color: {
				dark: '#80057F',
				light: '#FFFFFF'
			}
		};

		const generateQR = async (text: any) => {
			return await QRCode.toDataURL(text, opts);
		};

		ticket.qrcode = await generateQR(`https://www.quehay.pe/ticket/${params.id}`);
	}

	return { ticket };
};

const enviar: Action = async ({ cookies, request, locals, params }) => {
	let ticket = await locals.eventosRepo.getEntrada(params.id);

	const formData = Object.fromEntries(await request.formData());

	var opts: any = {
		errorCorrectionLevel: 'H',
		type: 'image/jpeg',
		quality: 0.3,
		margin: 1,
		color: {
			dark: '#80057F',
			light: '#FFFFFF'
		}
	};

	const generateQR = async (text: any) => {
		return await QRCode.toDataURL(text, opts);
	};

	ticket.qrcode = await generateQR(`https://www.quehay.pe/ticket/${params.id}`);

	const sgMail: MailService = new MailService();
	sgMail.setApiKey(SECRET_SENDGRID_KEY);

	const msg: any = {
		to: formData.email,
		from: 'contacto@quehay.com.pe',
		templateId: SECRET_SENDGRID_TICKET,
		dynamic_template_data: {
			subject: 'Quehay',
			id: ticket.id,
			artista: ticket.evento.artista,
			nombre: ticket.evento.nombre,
			ubicacion: ticket.evento.lugar,
			numero: ticket.numero.toString(),
			monto: ticket.monto.toString(),
			entradas: ticket.entradas,
			codigo: ticket.qrcode
		}
	};

	try {
		sgMail
			.send(msg)
			.then(() => {
				console.log('Email sent');
			})
			.catch((error) => {
				console.error(error);
			});
	} catch (err: any) {
		console.log('err', err);
	}
};

export const actions: Actions = { default: enviar };
