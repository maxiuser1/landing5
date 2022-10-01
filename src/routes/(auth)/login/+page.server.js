import { invalid } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.json();
      

        // if (!email) {
		// 	return invalid(400, { email, missing: true });
		// }

        
        console.log('ajson',data);
        return { success: true };
    }
  };