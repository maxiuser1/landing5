import { CosmosClient } from '@azure/cosmos';

export class UsuariosRepo implements App.UsuariosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	findUsuario = async (id: string): Promise<App.User> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const { resource: user } = await container.item(id, id).read();
		return user;
	};
}
