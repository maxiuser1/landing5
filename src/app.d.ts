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
			tipo: string;
			codigo: string;
			online: number;
			onlinei: number;
			color?: string;
			nombre: string;
			disponibles: number;
			tope: number;
			numerado: boolean;
			promo: string;
			descuentos: Descuento[];
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

		type IntencionCompra = {
			total: number;
		};

		type ItemCompra = {
			nombre: string;
			tipo: string;
			codigo: string;
			cantidad: number;
			precio: number;
		};

		interface EventosRepoInterface {
			getEventosDestacados(): Promise<Array<HomeEvento> | undefined>;
			getEvento(slug): Promise<Evento>;
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
