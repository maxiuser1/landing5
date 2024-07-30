// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		type User = {
			id?: string;
			nombre: string;
			apellido?: string;
			fbtoken: string;
			dni?: string;
			rol?: string;
			avatar?: string;
			correo: string;
			telefono?: string;
		};

		interface Locals {
			eventosRepo;
			usuariosRepo: UsuariosRepoInterface;
			contactosRepo;
			entradasRepo: EntradasRepoInterface;
			tiendaRepo: TiendaRepoInterface;
			user: User;
		}
		// interface PageData {}
		// interface Platform {}

		type Fila = {
			id: number;
			sits: Array<Asiento>;
		};

		type Producto = {
			id: string;
			nombre: string;
			stock: number;
			precio: number;
			img: string;
		};

		type ProductoComprado = {
			id: string;
			cantidad: number;
			total: number;
		};

		type Precio = {
			tipo: string;
			color?: string;
			nombre?: string;
			base: number;
			online: number;
			promotor: number;

			basei?: number;
			onlinei?: number;
			promotori?: number;

			final?: number;
			finali?: number;

			tope?: number;
			c?: number;
			disponibles?: number;
			regalo?: string;
			regaloIndividual?: {
				una: string;
				varias: string;
			};
			promo?: string;
			numerado: boolean;
			filas: Array<Fila>;
			total: number;
			descuento?: {
				nombre: string;
				descuento: number;
			};
			descuentos?: Array<Descuento>;
			qrcode?: boolean;
		};

		type TipoCanal = 'WEB' | 'PROMOTOR';

		type Descuento = {
			nombre: string;
			codigo: string;
			descuento: number;
			online: number;
			promotor: number;
			tipo: string;
		};

		type Entrada = {
			tenant: string;
			slug?: string;
			id?: string;
			entradas?: Array<Sentado>;
			fecha: Date;
			evento: {
				id?: string;
				slug?: string;
				artista?: string;
				nombre?: string;
				fecha?: string;
				lugar?: string;
			};
			qrcode?: string;
			user?: User;
			monto: number;
			cliente?: {
				id: string;
				nombre: string;
				apellido: string;
				correo: string;
				dni: string;
				tipo?: string;
			};
			picados?: number;
			montoBase?: number;
			canal: TipoCanal;
			formaPago?: string;
			tipoDscto?: string;
			codigoDescto?: string;
			numero: number;
			pago?: {
				dataMap?: {
					AUTHORIZATION_CODE: string;
					TRACE_NUMBER: string;
					ACTION_DESCRIPTION: string;
					CARD: string;
					TRANSACTION_DATE: string;
				};
			};
			impresos?: Array<{
				n: string;
				p: number;
			}>;
		};

		type Baneable = {
			banner: string;
		};

		type Evento = {
			id: string;
			nombre: string;
			artista: string;
			banner: string;
			card?: string;
			lugar: string;
			ciudad: string;
			desde?: number;
			descuento?: number;
			descontado?: number;
			slug: string;
			fechas?: Array<Fecha>;
			precios: Array<Precio>;
			mapa?: string;
			locacion?: string;
			externo?: boolean;
			redireccion?: string;
			ubicacion?: {
				nombre?: string;
				seccionamiento?: any;
				ciudad?: string;
			};
			caratula?: {
				thumb?: string;
				detalles?: string;
				card?: string;
			};
			general?: {
				categoria: string;
				nombre: string;
				artista: string;
				slug: string;
				destacado: boolean;
			};
			searchTerms?: string;
			publicado?: boolean;
		};

		type Fecha = {
			dia: string;
			hora: string;
			c: number;
			t: number;
		};

		type Sentado = {
			base?: number;
			online?: number;
			total?: number;
			promotor?: number;
			descuento?: {
				nombre?: string;
				valor?: number;
			} | null;
			tipo?: string;
			nombre?: string;
			regalo?: string;
			fila?: number;
			asiento?: number;
			cantidad: number;
			numerado?: boolean;
			tickets?: Array<{
				c?: string;
				v?: string;
			}>;
		};

		type Contado = {
			cantidad: number;
			tipo: string;
		};

		type Tickete = {
			c: string;
			v?: string;
		};

		type Esto = {
			evento: {
				id?: string;
				slug?: string;
				nombre?: string;
				artista?: string;
				fecha?: string;
				hora?: string;
				lugar?: string;
			};
			entradas: Array<Zoneado>;
			total: number;
		};

		type Zoneado = {
			tipo: string;
			nombre: string;
			cantidad: number;
			total: number;
			precio: number;
			lugares: Array<Lugareado>;
			numerado: boolean;
		};

		type Lugareado = {
			fila: number;
			sit: number;
		};

		type Compra = {
			evento: {
				id?: string;
				slug?: string;
				nombre?: string;
				artista?: string;
				fecha?: string;
				lugar?: string;
			};
			zona?: {
				tipo: string;
				nombre?: string;
			};
			user?: any;
			monto?: number;
			cantidad?: number;
			entradas?: Array<Sentado>;
			invitado?: any;
		};

		type CompraTienda = {
			productos: Array<{
				id: string;
				cantidad: number;
				total: number;
			}>;
			evento: {
				slug?: string;
			};
			total: number;
		};

		interface EventosRepoInterface {
			getEventosDestacados(): Promise<Array<Evento> | undefined>;
			getEventosPasados(): Promise<Array<Evento> | undefined>;
			getEvento(slug): Promise<Evento>;
			getEventoConLocacion(slug): Promise<Evento>;
			postTurno(turno): Promise<void>;
			getTurno(id): Promise<any>;
			findEvento(id): Promoise<Evento>;
			confirmarEntrada(evento, compra): Promise<void>;
			ventaManual(slug, compra, vendedor): Promise<void>;
			guardarEntrada(entrada): Promise<void>;
			getEntrada(id): Promise<Entrada>;
			picarEntrada(id, cantidad): Promise<void>;
			getEntradasPorNumero(slug, tipo, numero): Promise<Entrada | null>;
			picarEntradaFisica(ticket, numero): Promise<void>;
			guardarIngreso(ingreso): Promise<void>;
		}

		interface TiendaRepoInterface {
			getProductos(slug): Promise<Array<Producto>>;
			postPedido(turno): Promise<void>;
			getPedido(id): Promise<void>;
			guardarCompra(compra): Promise<void>;
			getCompras(slug): Promise<Array<any>>;
			getNewId(): Promise<string>;
			cerrarCompra(slug, id): Promise<void>;
		}

		interface UsuariosRepoInterface {
			findUsuario(id): Promise<User>;
			findByFb(id): Promise<User | null>;
			findByCorreo(correo): Promoise<User | null>;
			create(user: User): Promise<string>;
			complete(id: string, user: User): Promise<string>;
			log(event, error): Promise<void>;
		}

		interface ContactosRepoInterface {
			create(contacto): Promise<void>;
		}

		interface EntradasRepoInterface {
			getEntradas(userId, correo): Promise<Array<Entrada>>;
			traspasar(entradaId: string, transfereableId: string): Promise<void>;
		}
	}
}

export {};
