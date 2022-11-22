import { UsuariosRepo } from '$lib/repos';
import { handlee } from '$lib/utils/errorer';
import type { HandleClientError } from '@sveltejs/kit';
 
export const handleError: HandleClientError = ({ error, event } : { error:any, event: any}) => {
    console.log('cli error', error);
    console.log('cli even',event);
    handlee(JSON.stringify({error,event}));

  return {
    message: 'Whoops!',
    code: error.code ?? 'UNKNOWN'
  };
}