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
		rol?: string;
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

		basei?: number;
		onlinei?: number;
		promotori?: number;

		final?:number;
		finali?:number;

		tope?: number;
		disponibles?:number;
		regalo?: string;
		regaloIndividual?: {
			una: string;
			varias:string;
		};
		promo?: string;
		numerado: boolean;
		filas: Array<Fila>;
		total: number;
		descuento?: {
			nombre:string;
			descuento: number;
		};
		descuentos?: Array<Descuento>;
		qrcode?:boolean;
	};

	type TipoCanal = 'WEB' | 'PROMOTOR';

	type Descuento = {
		nombre: string;
		descuento: number;
		online: number;
		promotor: number;
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
		};
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
			ciudad?:string;
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
		descuento?:{
			nombre?:string;
			valor?: number;
		} | null,
		tipo?: string;
		nombre?: string;
		regalo?:string;
		fila?: number;
		asiento?: number;
		cantidad: number;
		numerado?: boolean;
		tickets?: Array<{
			c?: string;
			v?: string;
		}>;
	};

	type Tickete = {
		c:string;
		v?:string;
	}

	type Compra = {
		evento: {
			id?: string;
			slug?:string;
			nombre?:string;
			artista?:string;
			fecha?:string;
			lugar?:string;
		};
		zona?: {
			tipo: string;
			nombre?:string;
		};
		user?: any;
		monto?:number;
		cantidad?:number;
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
