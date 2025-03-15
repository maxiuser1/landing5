export class MarketplaceState {
	compras = $state<Array<{ oferta: App.Reventa; checked: boolean }>>([]);
	total = $derived.by(() => {
		let suma = 0;
		for (let cadaCompra of this.compras) {
			if (cadaCompra.checked) suma += cadaCompra.oferta.precio;
		}
		return suma;
	});
	constructor(reventas: App.Reventa[]) {
		this.compras = reventas.map((r) => ({ oferta: r, checked: false }));
	}
}
