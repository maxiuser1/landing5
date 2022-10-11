import { CosmosClient, type SqlQuerySpec } from '@azure/cosmos';

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

	findByFb = async (token: string): Promise<App.User | null> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.fbtoken = @token',
			parameters: [
				{
					name: '@token',
					value: token
				}
			]
		};

		const { resources: results } = await container.items.query<App.User>(querySpec).fetchAll();
		if (results && results[0]) return results[0];
		else return null;
	};

	create = async (user: App.User): Promise<string> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const { resource: createdItem } = await container.items.create(user);
		console.log('entrada guardada ', createdItem);
		return createdItem?.id ?? '';
	};
}
