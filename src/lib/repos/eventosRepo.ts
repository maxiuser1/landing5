import { removeCosmosFields } from '$lib/shared/cosmos-helpers';
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

	getComercios = async (comerciosIds: string[]): Promise<App.Comercio[]> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('comercios');

		const querySpec: SqlQuerySpec = {
			query: `SELECT c.id, c.productos, c.tipo FROM c WHERE  c.id in (${comerciosIds.map((id) => `'${id}'`).join(',')})`
		};
		const { resources: items } = await container.items.query<App.Comercio>(querySpec).fetchAll();
		return items;
	};

	getTurno = async (id: string): Promise<App.Turno> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('turnos');
		const { resource: turno } = await container.item(id, id).read<App.Turno>();
		return turno!;
	};

	getEntrada = async (id: string): Promise<App.Entrada> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('entradas');
		const { resource: turno } = await container.item(id, id).read<App.Entrada>();
		return turno!;
	};

	postTurno = async (turno: App.Turno): Promise<App.Turno> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('turnos');
		const secuencias = database.container('secuencias');
		const {
			resource: { va }
		} = await secuencias.item('1', '1').patch([{ op: 'incr', path: '/va', value: 1 }]);

		turno.numeroCompra = va.toString();
		const { resource: createdItem } = await container.items.create<App.Turno>(turno);
		return { ...turno, id: createdItem!.id };
	};

	ticketear = async (ticketSet: App.TicketsSet): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('entradas');

		let tickets = [];
		for (let cadaEntrada of ticketSet.entradas) {
			for (let cadaTicket of cadaEntrada.tickets) {
				tickets.push({ ...cadaTicket, tipo: 'invitado' });
			}

			for (let cadaTicket of cadaEntrada.reventas) {
				tickets.push({ ...cadaTicket, tipo: 'reventa' });
			}

			for (let cadaTicket of cadaEntrada.traspasos) {
				tickets.push({ ...cadaTicket, tipo: 'traspaso' });
			}
			tickets.push({ ...cadaEntrada.paraMi, tipo: 'paraMi' });
		}

		console.log('OPEN', ticketSet.id, tickets);
		await container.item(ticketSet.id, ticketSet.id).patch([
			{
				op: 'add',
				path: '/tickets',
				value: tickets
			}
		]);
	};

	confirmar = async (turno: App.Turno, authorization: any): Promise<string> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('ensallos');
		const entradas = database.container('entradas');
		const { resource: evento } = await container.item(turno.slug, turno.slug).read<App.Evento>();

		const replaceOperation: PatchOperation[] = [];
		if (!evento) throw new Error('Evento no encontrado');
		for (let i = 0; i < turno.compras.length; i++) {
			const compra = turno.compras[i];
			if (compra.tipo == 'entrada') {
				const indexPrecio = evento.precios.findIndex((t: any) => t.codigo == compra.codigo);
				const zona = evento.precios.find((t: any) => t.codigo == compra.codigo);

				replaceOperation.push({
					op: 'incr',
					path: `/precios/${indexPrecio}/van`,
					value: compra.cantidad
				});

				if (zona!.tipo == 'Asientos' || zona!.tipo == 'BOX') {
					const indexFila = zona!.filas.findIndex((t: any) => t.id == compra.fila);
					const fila = zona!.filas.find((t: any) => t.id == compra.fila);
					const indexAsiento = fila!.sits.findIndex((t: any) => t.id == compra.sit);
					const sit = fila!.sits.find((t: any) => t.id == compra.sit);

					replaceOperation.push({
						op: 'replace',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/s`,
						value: 3
					});
				}
			}
		}

		const cleanTurno = removeCosmosFields<App.Turno>(turno);
		const entrada: App.Entrada = {
			...cleanTurno,
			authorization,
			tipoPago: 'niubiz',
			fecha: new Date().toISOString(),
			canal: 'web',
			tickets: []
		};

		if (replaceOperation.length > 0) await container.item(turno.slug, turno.slug).patch(replaceOperation);

		const { resource: createdItem } = await entradas.items.create<App.Entrada>(entrada);
		return createdItem!.id;
	};
}
