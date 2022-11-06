import QRCode from 'qrcode';
import { MailService } from '@sendgrid/mail';

export const load = async ({ locals, params }) => {
	let ticket = await locals.eventosRepo.getEntrada(params.id);

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

	ticket.qrcode = await generateQR('1');

	// const sgMail: MailService = new MailService();
	// sgMail.setApiKey('SG.XXXXXXgD-zkMcpTImdpCOVqguRkA.q7ULcUPR5w9TX0XUB4KgNdEuxiDj3OUNJ5VrF4XTjto');

	// const msg = {
	// 	to: 'nocompila@hotmail.com',
	// 	from: 'contacto@quehay.com.pe',
	// 	templateId: 'd-97bfcfaccd104cbebef4467256671975',
	// 	dynamic_template_data: {
	// 		subject: 'Testing Templates',
	// 		artista: ticket.evento.artista,
	// 		nombre: ticket.evento.nombre,
	// 		ubicacion: ticket.evento.lugar,
	// 		numero: ticket.numero.toString(),
	// 		monto: ticket.monto.toString(),
	// 		entradas: ticket.entradas,
	// 		codigo: ticket.qrcode
	// 	}
	// };

	// try {
	// 	sgMail
	// 		.send(msg)
	// 		.then(() => {
	// 			console.log('Email sent');
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// } catch (err: any) {
	// 	console.log('err', err);
	// }

	return { ticket };
};
