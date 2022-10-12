import { CosmosClient } from '@azure/cosmos';

export class ContactosRepo implements App.ContactosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
	}

	create = async (contacto: any): Promise<void> => {
		const client = new CosmosClient(this.cn);
		const database = await client.database('quehaydb');
		const container = await database.container('contactos');

		const { resource: createdItem } = await container.items.create(contacto);
	};
}
