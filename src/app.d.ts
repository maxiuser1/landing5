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

		type Evento = {
			slug: string;
			banner: string;
			card: string;
			artista: string;
			nombre: string;
			lugar: string;
			fechas: string;
			id: string;
		};

		interface EventosRepoInterface {
			getEventosDestacados(): Promise<Array<Evento> | undefined>;
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
