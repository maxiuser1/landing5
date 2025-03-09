class ReservaState {
	slug = $state();
	tab = $state('inicio');
	mapa = $state('');
	compras = $state<App.ItemCompra[]>([]);

	total = $derived.by(() => {
		let total = 0;
		for (const n of this.compras) {
			total += n.total;
		}
		return total;
	});

	addSit(precio: App.Precio, fila: App.Fila, sit: App.Sit, tagFila: string, tagSit: string) {
		this.compras.push({
			codigo: `${precio.codigo}-${tagFila}-${tagSit}`,
			nombre: `${precio.nombre}, asiento ${tagFila}-${tagSit}`,
			precio: precio.online,
			cantidad: 1,
			total: precio.online,
			fila: fila.id,
			sit: sit.id
		});
	}

	delSit(precio: App.Precio, tagFila: string, tagSit: string) {
		const index = this.compras.findIndex((t) => t.codigo === `${precio.codigo}-${tagFila}-${tagSit}`);
		this.compras.splice(index, 1);
	}

	del(compra: App.ItemCompra) {
		const index = this.compras.indexOf(compra);
		this.compras.splice(index, 1);
	}

	sitted(precio: App.Precio, fila: string, sit: string) {
		return this.compras.some((t) => t.codigo === `${precio.codigo}-${fila}-${sit}`);
	}

	count(codigo: string): number {
		const compra = this.compras.find((t) => t.codigo === codigo);
		if (compra) {
			return compra.cantidad;
		}
		return 0;
	}

	inc({ codigo, nombre, online }: App.Precio) {
		const compra = this.compras.find((t) => t.codigo === codigo);
		if (compra) {
			compra.cantidad++;
			compra.total = compra.cantidad * compra.precio;
		} else {
			this.compras.push({
				codigo,
				nombre,
				precio: online,
				cantidad: 1,
				total: online
			});
		}
	}

	dec(codigo: string) {
		const compra = this.compras.find((t) => t.codigo === codigo);
		if (compra) {
			compra.cantidad--;
			compra.total = compra.cantidad * compra.precio;

			if (compra.cantidad == 0) {
				this.del(compra);
			}
		}
	}

	setMapa(mapa: string) {
		this.mapa = mapa;
		this.tab = 'mapa';
	}

	constructor(evento: App.Evento) {
		this.slug = evento.id;
		this.compras = [];
	}
}

const reserva: ReservaState | null = null;
export function getReserva(evento: App.Evento) {
	if (!reserva) {
		return new ReservaState(evento);
	}
	return reserva;
}
