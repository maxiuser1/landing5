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
		};

		interface Locals {
			eventosRepo: EventosRepoInterface;
			usuariosRepo: UsuariosRepoInterface;
			user: User;
		}

		type Entrada = Turno & {
			canal: string;
			tipoPago: string;
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
			// precios: ParrillaPrecio
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

		type Turno = IntencionCompra & {
			id: '';
			numeroCompra: string;
			user: User;
			fecha: string;
			clientIpAddress: string;
		};

		type IntencionCompra = {
			slug: string;
			total: number;
			compras: ItemCompra[];
		};

		type ItemCompra = {
			nombre: string;
			codigo: string;
			cantidad: number;
			precio: number;
			total: number;
			tipo: string;
			id: string;
			fila?: string;
			sit?: string;
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

		interface EventosRepoInterface {
			getEventosDestacados(): Promise<Array<HomeEvento> | undefined>;
			getEvento(slug): Promise<Evento>;
			postTurno(turno: App.IntencionCompra): Promise<App.Turno>;
			getTurno(id: string): Promise<App.Turno>;
			confirmar(turno: App.Turno, authorization: any): Promise<string>;
			getEntrada(id: string): Promise<App.Entrada>;
		}

		interface UsuariosRepoInterface {
			findUsuario(id): Promise<User>;
			findByFb(id): Promise<User | null>;
			findByCorreo(correo): Promoise<User | null>;
			create(user: User): Promise<string>;
			complete(id: string, user: User): Promise<string>;
			log(event, error): Promise<void>;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
