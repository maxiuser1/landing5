// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		eventosRepo;
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
		tope?: number;
		promo?: string;
		numerado: boolean;
		filas: Array<Fila>;
		total: number;
	};

	type Evento = {
		id: string;
		nombre: string;
		artista: string;
		banner: string;
		lugar: string;
		ciudad: string;
		slug: string;
		fechas?: any;
		precios: Array<Precio>;
		mapa?: string;
		locacion?: string;
		ubicacion?: {
			nombre?: string;
			seccionamiento?: any;
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
		tipo?: string;
		fila: number;
		asiento: number;
		cantidad: number;
		numerado?: boolean;
	};

	type Compra = {
		evento: {
			id?: string;
			slug?: string;
			artista?: string;
		};
		zona?: {
			tipo: string;
			base: number;
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
		guardarEntrada(entrada): Promise<void>;
	}
}
