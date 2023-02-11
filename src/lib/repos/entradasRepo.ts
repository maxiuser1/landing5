import { CosmosClient, type SqlQuerySpec } from '@azure/cosmos';

export class EntradasRepo implements App.EntradasRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getEntradas = async (userId: string): Promise<Array<App.Entrada>> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.cliente.id = @id',
			parameters: [
				{
					name: '@id',
					value: userId
				}
			]
		};

		const { resources: items } = await container.items.query<App.Entrada>(querySpec).fetchAll();

		return items;
	};
}
