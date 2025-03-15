// See https://svelte.dev/docs/kit/types#app.d.ts
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
			ciudad?: string;
			favoritos?: string[];
		};

		interface Locals {
			eventosRepo: EventosRepoInterface;
			usuariosRepo: UsuariosRepoInterface;
			user: User;
		}

		type Entrada = Turno & {
			canal: string;
			tipoPago: string;
			tickets: Ticket[];
			authorization?: any;
		};

		type HomeEvento = {
			slug: string;
			banner: string;
			card: string;
			artista: string;
			nombre: string;
			lugar: string;
			fechas: string;
			categoria: string;
			subCategoria: string;
			id: string;
		};

		type Evento = {
			id: string;
			general: {
				categoria: string;
				nombre: string;
				artista: string;
				slug: string;
				destacado: boolean;
			};
			fechas: {
				fechaUnica: string;
			};
			ubicacion: {
				nombre: string;
			};
			caratula: {
				banner: string;
				card: string;
				portada: string;
				textura: string;
				mapa: string;
				legalHeader: string;
				legalFooter: string;
				colorPrincipal: string;
				colorContrastePrincipal: string;
			};
			precios: Precio[];
		};

		type Precio = {
			nombre: string;
			color: string;
			codigo: string;
			tipo: string;
			online: number;
			onlinei: number;
			disponibles: number;
			descuentos: Descuento[];
			filas: Fila[];
		};

		type Fila = {
			id: string;
			sits: Sit[];
			tag: string;
		};

		type Sit = {
			id: string;
			s: number; //status -1: no disponible, 0: disponible
			c: number; //cantidad
			l: number; //limite
			o: any;
		};

		type Descuento = {
			nombre: string;
			codigo: string;
			descuento: number;
			online: number;
			promotor: number;
			tipo: string;
			fechaInicio: string;
			fechaLimite: string;
			habilitado: boolean;
		};

		type Turno = IntencionCompra & {
			id: '';
			numeroCompra: string;
			user: User;
			fecha: string;
			clientIpAddress: string;
			tipo: string;
		};

		type IntencionCompra = {
			slug: string;
			total: number;
			compras: ItemCompra[];
		};

		type IntencionReventa = {
			slug: string;
			total: number;
			compras: Reventa[];
		};

		type ItemCompra = {
			nombre: string;
			codigo: string;
			cantidad: number;
			precio: number;
			total: number;
			tipoPrecio: string;
			tipo: string;
			id: string;
			fila?: string;
			sit?: string;

			refEntradaId?: string;
			refTicketId?: number;
		};

		type Comercio = {
			id: string;
			tipo: string;
			tenant: string;
			productos: Producto[];
		};

		type Producto = {
			id: string;
			nombre: string;
			precio: number;
			img: string;
			stock: number;
		};

		type Ticket = {
			id: number;
			paraMi: boolean;
			cantidad: number;
			invitado: User | null;
			estado: string;
			compra?: ItemCompra;
			tipo?: string;
			precio?: number;
		};

		type NiubizConfig = {
			sessiontoken: string;
			channel: string;
			merchantid: string;
			purchasenumber: string;
			amount: number;
			cardholdername: string;
			cardholderlastname: string;
			cardholderemail: string;
			usertoken: string;
			expirationminutes: string;
			timeouturl: string;
			merchantlogo: string;
			formbuttoncolor: string;
			action: string;
		};

		type TicketsSet = {
			id: string;
			entradas: Array<{
				tickets: App.Ticket[];
				reventas: App.Ticket[];
				traspasos: App.Ticket[];
				paraMi: App.Ticket;
			}>;
		};

		type ParrillaPrecio = {
			titulos: Array<{
				desde: string;
				hasta: string;
				label: string;
			}>;
			items: ItemParrillaPrecio[];
		};

		type ItemParrillaPrecio = {
			zona: string;
			items: Array<{
				habilitado: boolean;
				precio: number | null;
			}>;
		};

		type Reventa = {
			entradaId: string;
			slug: string;
			precio: number;
			cantidad: number;
			compra: ItemCompra;
			ticketId: number;
		};

		type Categorizacion = {
			tipo: string;
			categorias: string[];
		};

		interface EventosRepoInterface {
			getEventosDestacados(): Promise<Array<HomeEvento> | undefined>;
			getEvento(slug): Promise<Evento>;
			postTurno(turno: App.IntencionCompra): Promise<App.Turno>;
			getTurno(id: string): Promise<App.Turno>;
			confirmar(turno: App.Turno, authorization: any): Promise<string>;
			confirmarReventa(turno: App.Turno, authorization: any): Promise<string>;
			getEntrada(id: string): Promise<App.Entrada>;
			getComercios(comerciosIds: string[]): Promise<App.Comercio[]>;
			ticketear(ticketSet: App.TicketsSet): Promise<void>;
			getReventas(): Promise<App.Reventa[]>;
		}

		interface UsuariosRepoInterface {
			findUsuario(id): Promise<User>;
			findByFb(id): Promise<User | null>;
			findByCorreo(correo): Promoise<User | null>;
			create(user: User): Promise<string>;
			complete(id: string, user: User): Promise<string>;
			log(event, error): Promise<void>;
			edit(
				id: string,
				user: { dni: string; nombre: string; apellido: string; ciudad: string; telefono: string; favoritos: string[] }
			): Promise<void>;
			getCategories(): Promise<any>;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
