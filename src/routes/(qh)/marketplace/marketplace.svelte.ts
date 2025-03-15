export class MarketplaceState {
	compras = $state<Array<{ oferta: App.Reventa; compra: App.Reventa }>>([]);

	constructor(reventas: App.Reventa[]) {
		this.compras = reventas.map((r) => ({ oferta: r, compra: { ...r, cantidad: 0, precio: 0 } }));
	}
}
