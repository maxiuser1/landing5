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
			user: User;
		}

		type Evento = {
			slug: string;
			id: string;
		};

		interface EventosRepoInterface {
			getEventosDestacados(): Promise<Array<Evento> | undefined>;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
