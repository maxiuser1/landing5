import QRCode from 'qrcode';

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

	return { ticket };
};
