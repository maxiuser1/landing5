class TicketsState {
	compra = $state<App.ItemCompra | null>(null);

	tickets = $state<App.Ticket[]>([]);
	traspasos = $state<App.Ticket[]>([]);
	reventas = $state<App.Ticket[]>([]);

	paraMi = $state<App.Ticket>({
		id: Math.floor(new Date().getTime() / 10),
		paraMi: true,
		cantidad: 0,
		invitado: null,
		estado: 'listo',
		compra: this.compra ?? undefined
	});

	invitados = $derived.by(() => this.tickets.filter((t) => !t.paraMi));

	total = $derived.by(() => {
		let total = this.paraMi.cantidad;
		for (const n of this.tickets) {
			total += n.cantidad;
		}
		for (const n of this.traspasos) {
			total += n.cantidad;
		}
		for (const n of this.reventas) {
			total += n.cantidad;
		}
		return total;
	});
	disabled = $derived(this.total >= this.compra!.cantidad);

	constructor(compra: App.ItemCompra, tickets: App.Ticket[]) {
		this.compra = compra;

		if (tickets.length == 0) {
			this.paraMi.cantidad = compra.cantidad;
		}

		this.tickets = tickets.filter((t) => t.tipo == 'invitado');
		this.reventas = tickets.filter((t) => t.tipo == 'reventa');
		this.traspasos = tickets.filter((t) => t.tipo == 'traspaso');
		if (tickets.some((t) => t.tipo == 'paraMi')) {
			const paraMiVal = tickets.find((t) => t.tipo == 'paraMi')!;
			this.paraMi = paraMiVal;
		}
	}

	addInvitado() {
		this.tickets.push({
			id: Math.floor(new Date().getTime() / 10),
			paraMi: false,
			cantidad: 1,
			invitado: null,
			estado: 'Pendiente',
			compra: this.compra ?? undefined
		});

		if (this.compra?.cantidad == 1) {
			this.paraMi.cantidad = 0;
		} else {
			if (this.paraMi.cantidad > 0) {
				this.paraMi.cantidad--;
			}
		}
	}

	delInvitado(id: number) {
		const index = this.tickets.findIndex((t) => t.id === id);
		this.tickets.splice(index, 1);

		if (this.compra?.cantidad == 1) {
			this.paraMi.cantidad = 1;
		}
	}

	incInvitado(ticket: App.Ticket) {
		if (this.paraMi.cantidad > 0) {
			this.paraMi.cantidad--;
		}
		ticket.cantidad++;
	}

	decInvitado(ticket: App.Ticket) {
		this.paraMi.cantidad++;
		ticket.cantidad--;
		if (ticket.cantidad == 0) {
			const indexDel = this.tickets.findIndex((t) => t.id === ticket.id);
			this.tickets.splice(indexDel, 1);
		}
	}

	///////////////Traspasos

	addTraspaso() {
		this.traspasos.push({
			id: Math.floor(new Date().getTime() / 10),
			paraMi: false,
			cantidad: 1,
			invitado: null,
			estado: 'Pendiente',
			compra: this.compra ?? undefined
		});

		if (this.compra?.cantidad == 1) {
			this.paraMi.cantidad = 0;
		} else {
			if (this.paraMi.cantidad > 0) {
				this.paraMi.cantidad--;
			}
		}
	}

	delTraspaso(id: number) {
		const index = this.traspasos.findIndex((t) => t.id === id);
		this.traspasos.splice(index, 1);

		if (this.compra?.cantidad == 1) {
			this.paraMi.cantidad = 1;
		}
	}

	incTraspaso(ticket: App.Ticket) {
		if (this.paraMi.cantidad > 0) {
			this.paraMi.cantidad--;
		}
		ticket.cantidad++;
	}

	decTraspaso(ticket: App.Ticket) {
		this.paraMi.cantidad++;
		ticket.cantidad--;
		if (ticket.cantidad == 0) {
			const indexDel = this.traspasos.findIndex((t) => t.id === ticket.id);
			this.traspasos.splice(indexDel, 1);
		}
	}

	///////////////Reventas

	addReventa() {
		this.reventas.push({
			id: Math.floor(new Date().getTime() / 10),
			paraMi: false,
			cantidad: 1,
			invitado: null,
			estado: 'Pendiente',
			compra: this.compra ?? undefined
		});

		if (this.compra?.cantidad == 1) {
			this.paraMi.cantidad = 0;
		} else {
			if (this.paraMi.cantidad > 0) {
				this.paraMi.cantidad--;
			}
		}
	}

	delReventa(id: number) {
		const index = this.reventas.findIndex((t) => t.id === id);
		this.reventas.splice(index, 1);

		if (this.compra?.cantidad == 1) {
			this.paraMi.cantidad = 1;
		}
	}

	incReventa(ticket: App.Ticket) {
		if (this.paraMi.cantidad > 0) {
			this.paraMi.cantidad--;
		}
		ticket.cantidad++;
	}

	decReventa(ticket: App.Ticket) {
		this.paraMi.cantidad++;
		ticket.cantidad--;
		if (ticket.cantidad == 0) {
			const indexDel = this.reventas.findIndex((t) => t.id === ticket.id);
			this.reventas.splice(indexDel, 1);
		}
	}
}

export function configureEntradas(entrada: App.Entrada): Array<{ ticketing: TicketsState; compra: App.ItemCompra }> {
	const entradas = entrada.compras
		.filter((t) => t.tipo == 'entrada')
		.map((compra) => {
			const tickets = entrada.tickets.filter((t: App.Ticket) => t.compra?.id === compra.id);
			return {
				ticketing: new TicketsState(compra, tickets),
				compra
			};
		});
	return entradas;
}
