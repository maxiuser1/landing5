export class EventosRepo implements App.EventosRepoInterface {
	cn: string;

	constructor(cn: string) {
		this.cn = cn;
		console.log('CNNNNNNNNNNNN', cn);
	}

	getEventosDestacados = async (): Promise<Array<App.Evento> | undefined> => {
		return undefined;
	};
}
