import * as prismic from '@prismicio/client';
import { SECRET_PRISMIC_TOKEN } from '$env/static/private';

const repoName = 'quehay';

const routes = [
	{
		type: 'contenido',
		uid: 'politicas-de-privacidad',
		path: '/'
	}
];

const createClient = ({ request, fetch }: { request: Request; fetch: any }) => {
	const clientOptions = {
		fetch,
		SECRET_PRISMIC_TOKEN,
		routes
	};
	const client = prismic.createClient(repoName, clientOptions);

	if (request) {
		client.enableAutoPreviewsFromReq(request);
	}

	return client;
};

export default createClient;
