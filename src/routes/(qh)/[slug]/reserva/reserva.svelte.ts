class ReservaState {
	slug = $state();
	tab = $state('inicio');
	compras = $state<App.ItemCompra[]>([]);
	reservadas = $derived.by(() => this.compras.filter((t) => t.cantidad > 0));

	total = $derived.by(() => {
		let total = 0;
		for (const n of this.compras) {
			total += n.total;
		}
		return total;
	});

	inc(compra: App.ItemCompra) {
		compra.cantidad++;
		compra.total = compra.cantidad * compra.precio;
	}

	dec(compra: App.ItemCompra) {
		compra.cantidad--;
		compra.total = compra.cantidad * compra.precio;
	}

	del(compra: App.ItemCompra) {
		compra.cantidad = 0;
		compra.total = 0;
	}

	constructor(evento: App.Evento) {
		this.slug = evento.id;
		this.compras = evento.precios.map((t) => {
			return {
				codigo: t.codigo,
				tipo: t.tipo,
				nombre: t.nombre,
				cantidad: 0,
				precio: t.online,
				total: 0
			};
		});
	}
}

const reserva: ReservaState | null = null;
export function getReserva(evento: App.Evento) {
	if (!reserva) {
		return new ReservaState(evento);
	}
	return reserva;
}
