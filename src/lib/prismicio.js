import * as prismic from '@prismicio/client';
const repoName = 'quehay'; // Fill in your repository name
const accessToken = 'MC5ZME9Eb0JBQUFDZ0FoTlFF.aBvvv70GR--_ve-_ve-_ve-_vVbvv73vv70r77-977-977-9Bh4p77-9FO-_ve-_vXIH77-9Nj1-77-9B--_vQ'; // If your repository is private, add an access token

// This defines how you will structure URL paths in your project.
// Update the types to match the Custom Types in your project, and edit
// the paths to match the folder-based routing in your project.
const routes = [
	{
		type: 'contenido',
		uid: 'politicas-de-privacidad',
		path: '/'
	}
];

const createClient = ({ fetch } = {}) => {
	const clientOptions = {
		fetch,
		accessToken,
		routes
	};
	const client = prismic.createClient(repoName, clientOptions);

	return client;
};

export default createClient;
