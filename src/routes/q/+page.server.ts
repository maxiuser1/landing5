import type { PageServerLoad } from "../(auth)/login/$types";

export const load: PageServerLoad = async ({ locals, params, fetch, request, url }) => {
	
    let eparam = url.searchParams.get('e');
    let iparam = url.searchParams.get('i');

    const entrada : any = await locals.eventosRepo.getEntrada(eparam!);
    let invitado = null;
    if (iparam && entrada) {
        invitado = entrada.tickets.find((t: any) => t.id == iparam!);
    }

    return { entrada, invitado };
};
 