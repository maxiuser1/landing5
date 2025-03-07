export class VentaManual {
	private evento: App.Evento;
	public constructor(evento: App.Evento) {
		this.evento = evento;
	}

	public debeGenerarQR(tipoZona: string, cantidad: number): boolean {
		const zona: App.Precio | undefined = this.evento.precios.find((t: App.Precio) => t.codigo == tipoZona);

		let generaQR = false;
		if (zona) {
			if (zona.numerado) {
				if (cantidad != zona.tope) {
					generaQR = true;
				}
			} else {
				if (zona!.qrcode) {
					generaQR = true;
				}
			}
		}

		return generaQR;
	}

	public tarificarNumerado(zona: App.Precio, cantidad: number) {
		if (cantidad == zona.tope) {
			zona.final = zona.promotor;
		} else {
			zona.final = zona.promotori! * cantidad;
		}
		return zona;
	}

	public tarificarGeneral(zona: App.Precio, cantidad: number) {
		zona.final = zona.promotor * cantidad;
		return zona;
	}

	public tarificar(tipoZona: string, cantidad: number): App.Precio {
		const zona: App.Precio | undefined = this.evento.precios.find((t: App.Precio) => t.codigo == tipoZona);

		if (!zona) throw new Error('Zona no válida');

		if (zona.numerado) return this.tarificarNumerado(zona, cantidad);
		else return this.tarificarGeneral(zona, cantidad);
	}

	public tarificarEntrada(tipoZona: string, cantidad: number, entrada: any): App.Precio {
		const zona: App.Precio | undefined = this.evento.precios.find((t: App.Precio) => t.codigo == tipoZona);

		if (!zona) throw new Error('Zona no válida');

		if (zona.numerado) {
			return this.tarificarNumerado(zona, cantidad);
		} else {
			if (entrada.descuento && entrada.descuento.nombre) {
				const descuentoAplicado = zona.descuentos?.find((t) => t.nombre == entrada.descuento.nombre);
				zona.final = descuentoAplicado!.promotor * cantidad;
				return zona;
			}
			return this.tarificarGeneral(zona, cantidad);
		}
	}
}
