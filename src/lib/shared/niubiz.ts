import { SECRET_NIUBIZ_NIUBIZAPI, SECRET_NIUBIZ_CREDENTIALS, SECRET_NIUBIZ_MERCHANTID } from '$env/static/private';
import axios from 'axios';

export class NiubizHandler {
	async getToken(): Promise<string> {
		const { data: token } = await axios.get(`${SECRET_NIUBIZ_NIUBIZAPI}/api.security/v1/security`, {
			headers: {
				Authorization: SECRET_NIUBIZ_CREDENTIALS
			}
		});
		return token;
	}

	async getSession(turno: App.Turno, user: App.User, redirect: string): Promise<App.NiubizConfig> {
		const token = await this.getToken();
		const { data: session } = await axios.post(
			`${SECRET_NIUBIZ_NIUBIZAPI}/api.ecommerce/v2/ecommerce/token/session/${SECRET_NIUBIZ_MERCHANTID}`,
			{
				channel: 'web',
				amount: turno.total,
				antifraud: {
					clientIp: '38.25.15.249',
					merchantDefineData: {
						MDD4: user.correo, //cambiar al correo del usuario
						MDD21: '0',
						MDD32: user.dni?.toString(), //DNI , ID o telefono
						MDD75: 'Invitado',
						MDD77: '1' //si el 75 es registrado es: Registro del cliente - hoy
					}
				}
			},
			{
				headers: {
					Authorization: token,
					'Content-Type': 'application/json'
				}
			}
		);

		const config: App.NiubizConfig = {
			sessiontoken: session.sessionKey,
			channel: 'web',
			merchantid: SECRET_NIUBIZ_MERCHANTID,
			purchasenumber: turno.numeroCompra,
			amount: turno.total,
			cardholdername: user.nombre,
			cardholderlastname: user.apellido ?? '',
			cardholderemail: user.correo,
			usertoken: user.id ?? '',
			expirationminutes: '20',
			timeouturl: 'about:blank',
			merchantlogo: 'https://www.quehay.pe/img/logo.png',
			formbuttoncolor: '#000000',
			action: `/${redirect}/${turno.id}`
		};

		return config;
	}

	async authorize(transactionToken: string, turno: App.Turno): Promise<any> {
		const token = await this.getToken();
		try {
			const resultado = await axios.post(
				`${SECRET_NIUBIZ_NIUBIZAPI}/api.authorization/v3/authorization/ecommerce/${SECRET_NIUBIZ_MERCHANTID}`,
				{
					channel: 'web',
					captureType: 'manual',
					countable: true,
					order: {
						tokenId: transactionToken,
						purchaseNumber: turno.numeroCompra,
						amount: turno.total,
						currency: 'PEN'
					}
				},
				{
					headers: {
						Authorization: token,
						'Content-Type': 'application/json'
					}
				}
			);
			return resultado.data;
		} catch (err: any) {}
	}
}
