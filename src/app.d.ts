// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		eventosRepo;
	}
	// interface PageData {}
	// interface Platform {}

	type Evento = {
		id: string;
		nombre: string;
		artista: string;
		banner: string;
		lugar: string;
		slug: string;
		fechas?: any;
		ubicacion?: {
			nombre?: string;
		};
	};

	interface EventosRepoInterface {
		getEventosDestacados(): Promise<Array<Evento> | undefined>;
		getEvento(slug): Promise<Evento>;
	}
}
