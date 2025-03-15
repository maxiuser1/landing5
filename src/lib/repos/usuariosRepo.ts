import { CosmosClient, Item, type SqlQuerySpec } from '@azure/cosmos';

export class UsuariosRepo implements App.UsuariosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	findUsuario = async (id: string): Promise<App.User> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const { resource: user } = await container.item(id, id).read();
		return user;
	};

	findByFb = async (token: string): Promise<App.User | null> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where c.fbtoken = @token',
			parameters: [
				{
					name: '@token',
					value: token
				}
			]
		};

		const { resources: results } = await container.items.query<App.User>(querySpec).fetchAll();
		if (results && results[0]) return results[0];
		else return null;
	};

	findByCorreo = async (correo: string): Promise<App.User | null> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const querySpec: SqlQuerySpec = {
			query: 'SELECT * from c where LOWER(c.correo) = @correo',
			parameters: [
				{
					name: '@correo',
					value: correo
				}
			]
		};

		const { resources: results } = await container.items.query<App.User>(querySpec).fetchAll();
		if (results && results[0]) return results[0];
		else return null;
	};

	create = async (user: App.User): Promise<string> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const { resource: createdItem } = await container.items.create(user);
		return createdItem?.id ?? '';
	};

	log = async (event: any, error: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('logeos');
		const entrada = {
			tenant: 'quehay',
			fecha: new Date(),
			event,
			error
		};
		await container.items.create(entrada);
	};

	complete = async (id: string, user: App.User): Promise<string> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const userItem = await container.item(id, id);
		const { resource: currentUser } = await userItem.read<App.User>();

		const updatedUser = {
			...currentUser,
			dni: user.dni,
			nombre: user.nombre,
			apellido: user.apellido,
			telefono: user.telefono
		};

		await userItem.replace(updatedUser);
		return userItem.id;
	};

	getCategories = async (): Promise<App.Categorizacion[]> => {
		const client = new CosmosClient(this.cn);
		const database = client.database('quehaydb');
		const container = database.container('parametros');
		const { resource } = await container.item('categorias', 'categorias').read();
		return resource.values;
	};

	edit = async (
		id: string,
		user: { dni: string; nombre: string; apellido: string; ciudad: string; telefono: string; favoritos: string[] }
	): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('personas');

		const userItem = await container.item(id, id);
		const { resource: currentUser } = await userItem.read<App.User>();

		const updatedUser = {
			...currentUser,
			dni: currentUser?.dni ? currentUser.dni : user.dni,
			nombre: user.nombre,
			apellido: user.apellido,
			telefono: user.telefono,
			ciudad: user.ciudad,
			favoritos: user.favoritos
		};

		await userItem.replace(updatedUser);
	};
}
