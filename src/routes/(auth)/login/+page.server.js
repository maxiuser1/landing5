import { invalid } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email) {
			return invalid(400, { email, missing: true });
		}

        
        console.log('a',email);
        return { success: true };
    }
  };