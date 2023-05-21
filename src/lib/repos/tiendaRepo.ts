import { CosmosClient, type SqlQuerySpec } from '@azure/cosmos';

export class TiendaRepo implements App.TiendaRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getCompras = async (slug: string): Promise<Array<App.Producto>> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('compras');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.tenant = @slug',
			parameters: [
				{
					name: '@slug',
					value: slug
				}
			]
		};

		const { resources: results } = await container.items.query<App.Producto>(querySpec).fetchAll();

		return results;
	};

	getProductos = async (slug: string): Promise<Array<App.Producto>> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('catalogos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.tenant = @slug',
			parameters: [
				{
					name: '@slug',
					value: slug
				}
			]
		};

		const { resources: results } = await container.items.query<App.Producto>(querySpec).fetchAll();

		return results;
	};

	cerrarCompra = async (id: string): Promise<any> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('compras');

		console.log('verify', id);

		await container.item(id, 'urban').patch([{ op: 'add', path: '/estado', value: 'cerrado' }]);
	};

	postPedido = async (turno: any): Promise<any> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('pedidos');

		const { resource: createdItem } = await container.items.create(turno);
	};

	guardarCompra = async (compra: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('compras');

		const { resource: createdItem } = await container.items.create(compra);
	};

	getNewId = async (): Promise<string> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('secuencias');
		const {
			resource: { value }
		} = await container.item('1', '1').patch([{ op: 'incr', path: '/value', value: 1 }]);

		return value.toString();
	};

	getPedido = async (id: string): Promise<any> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('pedidos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.id = @id',
			parameters: [
				{
					name: '@id',
					value: id
				}
			]
		};

		const { resources: results } = await container.items.query<App.Evento>(querySpec).fetchAll();
		return results[0];
	};
}
