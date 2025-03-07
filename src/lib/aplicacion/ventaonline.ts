export class VentaOnline {
	private evento: App.Evento;
	public constructor(evento: App.Evento) {
		this.evento = evento;
	}

	public tarificarNumerado(zona: App.Precio, cantidad: number) {
		zona.final = zona.onlinei! * cantidad;
		return zona;
	}

	public tarificarGeneral(zona: App.Precio, cantidad: number) {
		zona.final = zona.online * cantidad;
		return zona;
	}

	public tarificar(tipoZona: string, cantidad: number): App.Precio {
		const zona: App.Precio | undefined = this.evento.precios.find((t: App.Precio) => t.codigo == tipoZona);

		if (!zona) throw new Error('Zona no válida');

		if (zona.numerado) return this.tarificarNumerado(zona, cantidad);
		else return this.tarificarGeneral(zona, cantidad);
	}

	public tarificarEntrada(tipoZona: string, cantidad: number, entrada: any): App.Precio {
		console.log('tipoZona', tipoZona, entrada);
		const zona: App.Precio | undefined = this.evento.precios.find((t: App.Precio) => t.codigo == tipoZona);

		if (!zona) throw new Error('Zona no válida');

		if (zona.numerado) {
			return this.tarificarNumerado(zona, cantidad);
		} else {
			if (entrada.descuento && entrada.descuento.nombre) {
				const descuentoAplicado = zona.descuentos?.find((t) => t.nombre == entrada.descuento.nombre);
				zona.final = descuentoAplicado!.online * cantidad;
				return zona;
			}
			return this.tarificarGeneral(zona, cantidad);
		}
	}
}
