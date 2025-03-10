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

	getTurno = async (id: string): Promise<App.Turno> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('turnos');
		const { resource: turno } = await container.item(id, id).read<App.Turno>();
		return turno!;
	};

	postTurno = async (turno: App.Turno): Promise<string> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('turnos');
		const secuencias = database.container('secuencias');
		const {
			resource: { va }
		} = await secuencias.item('1', '1').patch([{ op: 'incr', path: '/va', value: 1 }]);

		// turno.numeroCompra = va.toString();
		turno.numeroCompra = Math.floor(new Date().getTime() / 10).toString();

		const { resource: createdItem } = await container.items.create(turno);
		return createdItem!.id!;
	};
}
