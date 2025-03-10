import {
	SECRET_NIUBIZ_CREDENTIALS,
	SECRET_NIUBIZ_MERCHANTID,
	SECRET_NIUBIZ_NIUBIZAPI,
	SECRET_NIUBIZ_NIUBIZLIB
} from '$env/static/private';
import type { PageServerLoad } from './$types';
import axios from 'axios';

export const load: PageServerLoad = async ({ locals, params }) => {
	const turno = await locals.eventosRepo.getTurno(params.id);

	const { data: token } = await axios.get(`${SECRET_NIUBIZ_NIUBIZAPI}/api.security/v1/security`, {
		headers: {
			Authorization: SECRET_NIUBIZ_CREDENTIALS
		}
	});

	console.log('token', token);

	const { data: session } = await axios.post(
		`${SECRET_NIUBIZ_NIUBIZAPI}/api.ecommerce/v2/ecommerce/token/session/${SECRET_NIUBIZ_MERCHANTID}`,
		{
			channel: 'web',
			amount: turno.total,
			antifraud: {
				clientIp: '38.25.15.249',
				merchantDefineData: {
					MDD4: locals.user.correo,
					MDD21: '0',
					MDD32: locals.user.dni?.toString(),
					MDD75: 'Invitado',
					MDD77: '1'
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

	console.log('session', session);

	const datapago = {
		sessiontoken: session.sessionKey,
		merchantid: SECRET_NIUBIZ_MERCHANTID,
		purchasenumber: turno.numeroCompra,
		amount: turno.total
	};

	return { turno, datapago, niubizlib: SECRET_NIUBIZ_NIUBIZLIB };
};
