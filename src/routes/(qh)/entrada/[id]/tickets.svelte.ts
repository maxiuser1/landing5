class TicketsState {
	compra = $state<App.ItemCompra | null>(null);
	tickets = $state<App.Ticket[]>([]);
	paraMi = $derived.by(() => this.tickets.find((t) => t.paraMi));
	invitados = $derived.by(() => this.tickets.filter((t) => !t.paraMi));
	total = $derived.by(() => {
		let total = 0;
		for (const n of this.tickets) {
			total += n.cantidad;
		}
		return total;
	});
	disabled = $derived(this.total >= this.compra!.cantidad);

	constructor(compra: App.ItemCompra, tickets: App.Ticket[]) {
		this.compra = compra;
		this.tickets = tickets;
		if (this.tickets.length == 0) {
			this.tickets.push({
				id: Math.floor(new Date().getTime() / 10),
				paraMi: true,
				cantidad: compra.cantidad,
				invitado: null,
				estado: 'listo',
				compraId: this.compra?.id || ''
			});
		}
	}

	add() {
		this.tickets.push({
			id: Math.floor(new Date().getTime() / 10),
			paraMi: false,
			cantidad: 1,
			invitado: null,
			estado: 'pendiente',
			compraId: this.compra?.id || ''
		});

		if (this.compra?.cantidad == 1) {
			this.tickets.find((t) => t.paraMi)!.cantidad = 0;
		} else {
			// this.tickets.find((t) => t.paraMi)!.cantidad--;
		}
	}

	del(id: number) {
		const index = this.tickets.findIndex((t) => t.id === id);
		this.tickets.splice(index, 1);

		if (this.compra?.cantidad == 1) {
			this.tickets.find((t) => t.paraMi)!.cantidad = 1;
		}
	}

	inc(ticket: App.Ticket) {
		// this.tickets.find((t) => t.paraMi)!.cantidad--;
		ticket.cantidad++;
	}

	dec(ticket: App.Ticket) {
		// this.tickets.find((t) => t.paraMi)!.cantidad++;
		ticket.cantidad--;
		if (ticket.cantidad == 0) {
			const indexDel = this.tickets.findIndex((t) => t.id === ticket.id);
			this.tickets.splice(indexDel, 1);
		}
	}
}

export function getTickets(compra: App.ItemCompra, tickets: App.Ticket[]): TicketsState {
	return new TicketsState(compra, tickets);
}
