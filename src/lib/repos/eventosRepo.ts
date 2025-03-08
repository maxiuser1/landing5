import { CosmosClient, type PatchOperation, type SqlQuerySpec } from '@azure/cosmos';

export class EventosRepo implements App.EventosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	getEventosDestacados = async (): Promise<Array<App.HomeEvento> | undefined> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('eventos');

		const querySpec: SqlQuerySpec = {
			query:
				'SELECT c.externo, c.redireccion, c.banner, c.card, c.slug, c.fechas,c.nombre,c.artista,c.lugar, c.desde, c.descuento, c.descontado, c.ciudad, c.searchTerms FROM c WHERE  c.publicado = true order by c.destacado desc'
		};

		const { resources: items } = await container.items.query<App.HomeEvento>(querySpec).fetchAll();

		return items;
	};

	getEvento = async (slug: string): Promise<App.Evento> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');
		const { resource: evento } = await container.item(slug, slug).read<App.Evento>();
		return evento!;
	};
}
