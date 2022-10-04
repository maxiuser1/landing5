import { CosmosClient, type SqlQuerySpec } from '@azure/cosmos';
export class EventosRepo implements App.EventosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getEventosDestacados = async (): Promise<Array<App.Evento> | undefined> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('eventos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT c.banner, c.slug, c.fechas,c.nombre,c.artista,c.lugar FROM c WHERE c.destacado'
		};

		const { resources: items } = await container.items.query<App.Evento>(querySpec).fetchAll();

		return items;
	};

	getEvento = async (slug: string): Promise<App.Evento> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.general.slug = @slug',
			parameters: [
				{
					name: '@slug',
					value: slug
				}
			]
		};

		const { resources: results } = await container.items.query<App.Evento>(querySpec).fetchAll();

		return results[0];
	};

	getEventoConLocacion = async (slug: string): Promise<App.Evento> => {
		const evento = await this.getEvento(slug);

		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('seccionamientos');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.id = @id',
			parameters: [
				{
					name: '@id',
					value: evento.ubicacion!.seccionamiento
				}
			]
		};

		const { resources: items } = await container.items
			.query(querySpec, { partitionKey: evento.lugar })
			.fetchAll();

		const resultado = { ...evento, locacion: items[0].general.mapa };

		return resultado;
	};

	postTurno = async (turno: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('turnos');

		const { resource: createdItem } = await container.items.create(turno);
		console.log('created', createdItem);
	};
}
