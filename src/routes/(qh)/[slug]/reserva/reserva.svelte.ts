export class ReservaState {
	slug = $state();
	tab = $state('inicio');

	constructor(slug: string) {
		this.slug = slug;
	}

	reset() {
		this.slug = '';
	}
}
