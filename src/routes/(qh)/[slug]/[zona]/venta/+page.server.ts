import { SECRET_SENDGRID_KEY, SECRET_SENDGRID_TICKET } from '$env/static/private';
import { redirect, type Actions } from '@sveltejs/kit';
// import QRCode from 'qrcode';
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

		const entrada = await locals.eventosRepo.ventaManual(params.slug, compraCliente, vendedor);

		let qrcode = '';

		// if(generaQR){
		// 	var opts: any = {
		// 		errorCorrectionLevel: 'H',
		// 		type: 'image/jpeg',
		// 		quality: 0.3,
		// 		margin: 1,
		// 		color: {
		// 			dark: '#80057F',
		// 			light: '#FFFFFF'
		// 		}
		// 	};

		// 	const generateQR = async (text: any) => {
		// 		return await QRCode.toDataURL(text, opts);
		// 	};

		// 	 qrcode = await generateQR(`https://www.quehay.pe/ticket/${params.id}`);
		// }

		const sgMail: MailService = new MailService();
		sgMail.setApiKey(SECRET_SENDGRID_KEY);

		const msg: any = {
			to: formData.correo,
			from: 'contacto@quehay.com.pe',
			templateId: SECRET_SENDGRID_TICKET,
			dynamic_template_data: {
				subject: 'Quehay',
				id: entrada.id,
				artista: compra.evento.artista,
				nombre: compra.evento.nombre,
				ubicacion: compra.evento.lugar,
				numero: entrada.numero.toString(),
				monto: entrada.monto.toString(),
				entradas: compra.entradas.map((t: any) => {
					return { ...t, fila: letrar(t.fila) };
				}),
				codigo: qrcode
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

		throw redirect(303, `/ticket/${entrada.id}`);
	}
};
