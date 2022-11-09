// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	type User = {
		id?: string;
		nombre: string;
		apellido?: string;
		fbtoken: string;
		dni?: string;
		avatar?: string;
		correo: string;
		telefono?: string;
	};

	interface Locals {
		eventosRepo;
		usuariosRepo;
		contactosRepo;
		user: User;
	}
	// interface PageData {}
	// interface Platform {}

	type Fila = {
		id: number;
		sits: Array<Asiento>;
	};

	type Precio = {
		tipo: string;
		color?: string;
		nombre?: string;
		base: number;
		online: number;
		promotor: number;
		tope?: number;
		promo?: string;
		numerado: boolean;
		filas: Array<Fila>;
		total: number;
		descuentos?: Array<Descuento>;
	};

	type Descuento = {
		nombre: string;
		descuento: number;
		online: number;
		promotor: number;
	};

	type Entrada = {
		id: string;
		entradas: Array<Sentado>;
		evento: {
			nombre: string;
			lugar: string;
			fecha: Date;
			artista: string;
		};
		qrcode?: string;
		user: User;
		monto: number;
		numero: number;
		pago?: {
			dataMap?: {
				AUTHORIZATION_CODE: string;
				ACTION_DESCRIPTION: string;
				CARD: string;
				TRANSACTION_DATE: string;
			};
		};
	};

	type Baneable = {
		banner: string;
	};

	type Evento = {
		id: string;
		nombre: string;
		artista: string;
		banner: string;
		lugar: string;
		ciudad: string;
		desde?: number;
		descuento?: number;
		descontado?: number;
		slug: string;
		fechas?: any;
		precios: Array<Precio>;
		mapa?: string;
		locacion?: string;
		ubicacion?: {
			nombre?: string;
			seccionamiento?: any;
		};
		caratula?: {
			thumb?: string;
			detalles?: string;
		};
		general?: {
			categoria: string;
			nombre: string;
			artista: string;
			slug: string;
			destacado: boolean;
		};
	};

	type Sentado = {
		base?: number;
		online?: number;
		final?: number;
		promotor?: number;
		descuento?: number;
		tipo?: string;
		nombre?: string;
		fila: number;
		asiento: number;
		cantidad: number;
		numerado?: boolean;
		tickets?: Array<{
			c?: string;
			v?: string;
		}>;
	};

	type Compra = {
		evento: {
			id?: string;
			slug?: string;
			artista?: string;
			nombre?: string;
			fecha?: string;
			lugar?: string;
		};
		zona?: {
			tipo: string;
			base: number;
			online: number;
			promotor: number;
			nombre?: string;
			numerado?: boolean;
		};
		user?: any;
		entradas?: Array<Sentado>;
	};

	interface EventosRepoInterface {
		getEventosDestacados(): Promise<Array<Evento> | undefined>;
		getEvento(slug): Promise<Evento>;
		getEventoConLocacion(slug): Promise<Evento>;
		postTurno(turno): Promise<void>;
		getTurno(id): Promise<any>;
		findEvento(id): Promoise<Evento>;
		confirmarEntrada(evento, compra): Promise<void>;
		ventaManual(slug, compra, vendedor): Promise<void>;
		guardarEntrada(entrada): Promise<void>;
		getEntrada(id): Promise<Entrada>;
	}

	interface UsuariosRepoInterface {
		findUsuario(id): Promise<User>;
		findByFb(id): Promise<User | null>;
		create(user: User): Promise<string>;
		complete(id: string, user: User): Promise<string>;
	}

	interface ContactosRepoInterface {
		create(contacto): Promise<void>;
	}
}
