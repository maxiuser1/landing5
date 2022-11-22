import { UsuariosRepo } from '$lib/repos';
import type { HandleClientError } from '@sveltejs/kit';
 
export const handleError: HandleClientError = ({ error, event } : { error:any, event: any}) => {
  new UsuariosRepo("AccountEndpoint=https://encuestasdb.documents.azure.com:443/;AccountKey=jbUfTnFcRnprj1rKnuMxQXBsiJr4ph2MTxdyDWhKYHNZe0z0Et6ecKIkKnVOcY8uaWBTiPDG3BjBetDtj7lfpA==").log(event,error);
  return {
    message: 'Whoops!',
    code: error.code ?? 'UNKNOWN'
  };
}