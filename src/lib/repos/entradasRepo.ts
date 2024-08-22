import { CosmosClient, type PatchOperation, type SqlQuerySpec } from '@azure/cosmos';

export class EntradasRepo implements App.EntradasRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getReporte = async (slug: string): Promise<Array<App.Entrada>> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('entradas');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.slug = @slug',
			parameters: [
				{
					name: '@slug',
					value: slug
				}
			]
		};
		const { resources: items } = await container.items.query<App.Entrada>(querySpec).fetchAll();
		return items;
	};

	getEntradas = async (userId: string, correo: string): Promise<Array<App.Entrada>> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where STRINGEQUALS( c.cliente.correo , @correo, true) or c.cliente.id = @id',
			parameters: [
				{
					name: '@id',
					value: userId
				},
				{
					name: '@correo',
					value: correo.toLowerCase()
				}
			]
		};

		const { resources: items } = await container.items.query<App.Entrada>(querySpec).fetchAll();

		return items;
	};

	traspasar = async (entradaId: string, transfereableId: string): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');
		const containerUser = await database.container('personas');

		const { resource: transfereable } = await containerUser.item(transfereableId, transfereableId).read();
		const { resource: entrada } = await container.item(entradaId, 'quehay').read();

		entrada.owners = entrada.owners ? [...entrada.owners, entrada.cliente] : [entrada.cliente];

		const newClient = { nombre: transfereable.nombre, correo: transfereable.correo, apellido: transfereable.apellido, dni: transfereable.dni, id: transfereable.id };

		const replaceOperation: PatchOperation[] = [];
		replaceOperation.push({
			op: 'replace',
			path: `/cliente`,
			value: newClient
		});

		await container.item(entradaId, 'quehay').patch(replaceOperation);
	};
}
