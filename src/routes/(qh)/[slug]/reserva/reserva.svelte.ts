class ReservaState {
	slug = $state();
	tab = $state('inicio');
	compras = $state<App.ItemCompra[]>([]);

	total = $derived.by(() => {
		let total = 0;
		for (const n of this.compras) {
			total += n.cantidad * n.precio;
		}
		return total;
	});

	constructor(evento: App.Evento) {
		this.slug = evento.id;
		this.compras = evento.precios.map((t) => {
			return {
				codigo: t.codigo,
				tipo: t.tipo,
				nombre: t.nombre,
				cantidad: 0,
				precio: t.online
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
