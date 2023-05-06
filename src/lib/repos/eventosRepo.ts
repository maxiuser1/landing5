import { VentaManual } from '$lib/aplicacion/ventamanual';
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
			query: 'SELECT c.banner, c.card, c.slug, c.fechas,c.nombre,c.artista,c.lugar, c.desde, c.descuento, c.descontado, c.ciudad FROM c WHERE c.destacado'
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
		const container = await this.getContainer('ensallos');
		const { resource: evento } = await container.item(id, 'quehay').read();
		return evento;
	};

	getEntrada = async (id: string): Promise<App.Entrada> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const { resource: entrada } = await container.item(id, 'quehay').read();
		return entrada;
	};

	getEntradasPorNumero = async (tipo: string, numero: string): Promise<App.Entrada | null> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const querySpec: SqlQuerySpec = {
			query: `SELECT c.id
			FROM c
			join f in c.entradas
			join t in c.impresos
			where 
			f.tipo = @tipo 
			and contains(t.n, @numero)`,
			parameters: [
				{
					name: '@tipo',
					value: tipo
				},
				{
					name: '@numero',
					value: numero
				}
			]
		};

		const { resources: results } = await container.items.query<App.Entrada>(querySpec).fetchAll();

		console.log('r', results);

		if (results && results.length > 0) {
			const { resource: entrada } = await container.item(results[0].id!, 'quehay').read();
			return entrada;
		} else {
			return null;
		}
	};

	picarEntradaFisica = async (ticket: App.Entrada, numero: string): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		if (ticket && ticket.impresos) {
			const currentInd = ticket.impresos.findIndex((t: any) => t.n.endsWith(numero));
			const replaceOperation: PatchOperation[] = [];

			console.log('currentind', currentInd);
			replaceOperation.push({
				op: 'replace',
				path: `/impresos/${currentInd}/p`,
				value: 1
			});

			await container.item(ticket.id!, 'quehay').patch(replaceOperation);
		}
	};

	picarEntrada = async (id: string, cantidad: number): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('entradas');

		const replaceOperation: PatchOperation[] = [];

		console.log('cantidad', cantidad);

		replaceOperation.push({
			op: 'incr',
			path: `/picados`,
			value: cantidad
		});

		await container.item(id, 'quehay').patch(replaceOperation);
	};

	ventaManual = async (slug: string, compra: any, vendedor: any): Promise<any> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');
		const containerEntradas = await database.container('entradas');

		const { resource: evento } = await container.item(compra.evento.id, 'quehay').read();

		const ventaManual = new VentaManual(evento);

		let precioReal: number = 0;

		for (let entrada of compra.entradas) {
			const entradaDb = ventaManual.tarificarEntrada(entrada.tipo!, entrada.cantidad, entrada);

			if (entradaDb.numerado) {
				const fila = entradaDb.filas.find((t) => t.id == entrada.fila);
				const asiento = fila?.sits.find((t) => t.id == entrada.asiento);
				const habilitados = asiento.c ? entradaDb.tope! - asiento.c : entradaDb.tope;

				const final = habilitados == entradaDb.tope ? entrada.final : entrada.cantidad! * entradaDb.promotori!;
				precioReal += final!;
			} else {
				precioReal += entradaDb.final!;
			}
		}
		const replaceOperation: PatchOperation[] = [];
		compra.entradas.forEach((entrada: any) => {
			const indexPrecio = evento.precios.findIndex((t: any) => t.tipo == entrada.tipo);
			const currentPrecio = evento.precios.find((t: any) => t.tipo == entrada.tipo);

			if (entrada.numerado) {
				const currentPrecio = evento.precios.find((t: any) => t.tipo == entrada.tipo);
				const indexFila = currentPrecio!.filas.findIndex((t: any) => t.id == entrada.fila);

				const fila = currentPrecio!.filas.find((t: any) => t.id == entrada.fila);
				const indexAsiento = fila!.sits.findIndex((t: any) => t.id == entrada.asiento);

				const asiento = fila!.sits.find((t: any) => t.id == entrada.asiento);
				const currentCantidad = asiento.c != undefined ? Number(asiento.c) : 0;

				if (entrada.cantidad + currentCantidad == currentPrecio.tope) {
					replaceOperation.push({
						op: 'replace',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/s`,
						value: 3
					});
					replaceOperation.push({
						op: 'incr',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/c`,
						value: entrada.cantidad
					});
				} else {
					replaceOperation.push({
						op: 'incr',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/c`,
						value: entrada.cantidad
					});
				}
			} else {
				if (entrada.descuento && entrada.descuento.nombre) {
					const indexdescuento = currentPrecio!.descuentos.findIndex((t: any) => t.nombre == entrada.descuento.nombre);

					replaceOperation.push({
						op: 'incr',
						path: `/precios/${indexPrecio}/descuentos/${indexdescuento}/van`,
						value: entrada.cantidad
					});
				}

				replaceOperation.push({
					op: 'incr',
					path: `/precios/${indexPrecio}/c`,
					value: entrada.cantidad
				});
			}
		});

		if (replaceOperation.length > 0) await container.item(compra.evento.id, 'quehay').patch(replaceOperation);

		const purchasenumber = Math.floor(new Date().getTime() / 10);

		const entrada: App.Entrada = {
			tenant: 'quehay',
			evento: compra.evento,
			slug: compra.evento.slug,
			entradas: compra.entradas,
			monto: precioReal,
			numero: purchasenumber,
			user: vendedor,
			cliente: compra.cliente,
			formaPago: compra.formaPago,
			fecha: new Date(),
			canal: 'PROMOTOR'
		};

		const { resource: createdItem } = await containerEntradas.items.create(entrada);

		return createdItem;
	};

	confirmarEntrada = async (compra: any, evento: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('ensallos');

		const replaceOperation: PatchOperation[] = [];
		compra.entradas.forEach((entrada: any) => {
			const indexPrecio = evento.precios.findIndex((t: any) => t.tipo == entrada.tipo);
			const zona = evento.precios.find((t: any) => t.tipo == entrada.tipo);

			if (entrada.numerado) {
				const indexFila = zona!.filas.findIndex((t: any) => t.id == entrada.fila);

				const fila = zona!.filas.find((t: any) => t.id == entrada.fila);
				const indexAsiento = fila!.sits.findIndex((t: any) => t.id == entrada.asiento);

				const asiento = fila!.sits.find((t: any) => t.id == entrada.asiento);

				const currentCantidad = asiento.c != undefined ? Number(asiento.c) : 0;

				if (entrada.cantidad + currentCantidad == zona.tope) {
					replaceOperation.push({
						op: 'replace',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/s`,
						value: 3
					});
					replaceOperation.push({
						op: 'incr',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/c`,
						value: entrada.cantidad
					});
				} else {
					replaceOperation.push({
						op: 'incr',
						path: `/precios/${indexPrecio}/filas/${indexFila}/sits/${indexAsiento}/c`,
						value: entrada.cantidad
					});
				}
			} else {
				if (entrada.descuento && entrada.descuento.nombre) {
					const indexdescuento = zona!.descuentos.findIndex((t: any) => t.nombre == entrada.descuento.nombre);

					replaceOperation.push({
						op: 'incr',
						path: `/precios/${indexPrecio}/descuentos/${indexdescuento}/van`,
						value: entrada.cantidad
					});
				}

				replaceOperation.push({
					op: 'incr',
					path: `/precios/${indexPrecio}/c`,
					value: entrada.cantidad
				});
			}
		});

		if (replaceOperation.length > 0) await container.item(compra.evento.id, 'quehay').patch(replaceOperation);
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

		const { resources: items } = await container.items.query(querySpec, { partitionKey: evento.lugar }).fetchAll();

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

	getContainer = async (cname: string) => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container(cname);
		return container;
	};
}
