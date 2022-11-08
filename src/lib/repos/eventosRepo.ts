import { CosmosClient, type PatchOperation, type SqlQuerySpec } from '@azure/cosmos';
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
			query:
				'SELECT c.banner, c.slug, c.fechas,c.nombre,c.artista,c.lugar, c.desde, c.descuento, c.descontado, c.ciudad FROM c WHERE c.destacado'
		};

		const { resources: items } = await container.items.query<App.Evento>(querySpec).fetchAll();

		return items;
	};

	guardarEntrada = async (entrada: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const { resource: createdItem } = await container.items.create(entrada);
	};

	findEvento = async (id: string): Promise<App.Evento> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');

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

	getEntrada = async (id: string): Promise<App.Entrada> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const { resource: entrada } = await container.item(id, 'quehay').read();
		return entrada;
	};

	confirmarEntrada = async (compra: any, evento: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');

		const replaceOperation: PatchOperation[] = [];
		compra.entradas.forEach((entrada: any) => {
			const indexPrecio = evento.precios.findIndex((t: any) => t.tipo == entrada.tipo);

			if (entrada.numerado) {
				const ubicacion = evento.precios.find((t: any) => t.tipo == entrada.tipo);
				const indexFila = ubicacion!.filas.findIndex((t: any) => t.id == entrada.fila);

				const fila = ubicacion!.filas.find((t: any) => t.id == entrada.fila);
				const indexAsiento = fila!.sits.findIndex((t: any) => t.id == entrada.asiento);

				replaceOperation.push({
					op: 'replace',
					path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/s`,
					value: 2
				});
			}
		});

		if (replaceOperation.length > 0)
			await container.item(compra.evento.id, 'quehay').patch(replaceOperation);
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

	postTurno = async (turno: any): Promise<any> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('turnos');

		const { resource: createdItem } = await container.items.create(turno);
	};

	getTurno = async (id: string): Promise<any> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('turnos');

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
