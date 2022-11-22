import { ContactosRepo, EventosRepo, UsuariosRepo } from '$lib/repos';
import { SECRET_DATABASE_URL } from '$env/static/private';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.eventosRepo = new EventosRepo(SECRET_DATABASE_URL);
	event.locals.usuariosRepo = new UsuariosRepo(SECRET_DATABASE_URL);
	event.locals.contactosRepo = new ContactosRepo(SECRET_DATABASE_URL);

	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await event.locals.usuariosRepo.findUsuario(session);

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};

export const handleError: HandleServerError = ({ error, event } : { error: any, event:any}) => {
	
	console.log('err', error);
	console.log('eve', event);
	if(event?.url.includes('immutable')){
		console.log('logeoerror');
	} else{
		const usuarioRepo = new UsuariosRepo(SECRET_DATABASE_URL);
		usuarioRepo.log(event,error);
	}
	return {
	  message: 'Whoops!',
	  code: error.code ?? 'UNKNOWN'
	};
  }