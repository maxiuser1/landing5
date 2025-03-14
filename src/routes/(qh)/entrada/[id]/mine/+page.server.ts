import type { PageServerLoad } from './$types';
import QRCode from 'qrcode';

export const load: PageServerLoad = async ({ params, locals, request }) => {
	const entrada = await locals.eventosRepo.getEntrada(params.id);
	const evento = await locals.eventosRepo.getEvento(entrada.slug);

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

	const now = Date.now();
	const qrcode = await generateQR(`id=${params.id}&ts=${now}`);

	return {
		entrada,
		evento,
		qrcode
	};
};
