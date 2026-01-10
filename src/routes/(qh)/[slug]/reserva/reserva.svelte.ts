class ReservaState {
	slug = $state();
	tab = $state('inicio');
	codigoDescuento = $state('');
	comercio = $state('');
	mapa = $state('');
	compras = $state<App.ItemCompra[]>([]);
	descuentos = $state<App.ItemDescuento[]>([]);
	descuento = $state<number>(0);

	descontable = $derived.by(() => {
		let total = 0;
		for (const n of this.compras) {
			total += n.total;
		}
		return total;
	});

	total = $derived.by(() => {
		let total = 0;
		for (const n of this.compras) {
			total += n.total;
		}
		if (this.descuento > 0) {
			return total - (total * this.descuento) / 100;
		}
		return total;
	});

	has(codigo: string): boolean {
		return this.compras.some((t) => t.codigo === codigo || t.id == codigo);
	}

	goInicio() {
		this.tab = 'inicio';
		this.mapa = '';
	}

	decBox(compra: App.ItemCompra) {
		if(compra.cantidad == 1){
			this.del(compra);
		}
		else {
			compra.cantidad--;
		 	compra.precio = compra.precioi! * compra.cantidad;
		 	compra.total = compra.precio;
		}
	}

	incBox(compra: App.ItemCompra) {
		if(compra.cantidad  < compra.restantes!){ 
			compra.cantidad++;
			compra.precio = compra.precioi! * compra.cantidad;
			compra.total = compra.precio;
		}
	}

	addBox(precio: App.Precio, fila: App.Fila, sit: App.Sit, tagFila: string, tagSit: string) {
		const permiteCompraParcial = sit.l != sit.c;
		const hayComprasParciales = sit.c > 0 && sit.c < sit.l;
		let compraBox = {
			id: `${precio.codigo}-${tagFila}-${tagSit}`,
			codigo: precio.codigo,
			tipoPrecio: precio.tipo,
			tipo: 'entrada',
			nombre: `${precio.nombre}, box ${tagFila}-${tagSit}`,
			precio:  precio.online,
			precioi: precio.onlinei,
			limite: sit.l,
			cantidad: sit.l,
			total:  precio.online,
			fila: fila.id,
			sit: sit.id,
			parcializada: permiteCompraParcial,
			restantes: sit.l - sit.c
		};

		if(permiteCompraParcial && hayComprasParciales)
		{
			compraBox.cantidad = compraBox.restantes!;
			compraBox.precio =  precio.onlinei! * compraBox.restantes;
		 	compraBox.total = compraBox.precio;
		}
		this.compras.push(compraBox);
	}

	delBox(precio: App.Precio, tagFila: string, tagSit: string) {
		const index = this.compras.findIndex((t) => t.id === `${precio.codigo}-${tagFila}-${tagSit}`);
		this.compras.splice(index, 1);
	}

	addSit(precio: App.Precio, fila: App.Fila, sit: App.Sit, tagFila: string, tagSit: string) {
		this.compras.push({
			id: `${precio.codigo}-${tagFila}-${tagSit}`,
			codigo: precio.codigo,
			tipoPrecio: precio.tipo,
			tipo: 'entrada',
			nombre: `${precio.nombre}, asiento ${tagFila}-${tagSit}`,
			precio: precio.online,
			cantidad: 1,
			total: precio.online,
			fila: fila.id,
			sit: sit.id,
			parcializada:false
		});
	}

	delSit(precio: App.Precio, tagFila: string, tagSit: string) {
		const index = this.compras.findIndex((t) => t.id === `${precio.codigo}-${tagFila}-${tagSit}`);
		this.compras.splice(index, 1);
	}

	del(compra: App.ItemCompra) {
		const index = this.compras.indexOf(compra);
		this.compras.splice(index, 1);
	}

	sitted(precio: App.Precio, fila: string, sit: string) {
		return this.compras.some((t) => t.id === `${precio.codigo}-${fila}-${sit}`);
	}

	countProductos(id: string): number {
		const compra = this.compras.find((t) => t.id === id);
		if (compra) {
			return compra.cantidad;
		}
		return 0;
	}

	count(codigo: string): number {
		const compra = this.compras.find((t) => t.id === codigo);
		if (compra) {
			return compra.cantidad;
		}
		return 0;
	}

	sum(codigo: string): number {
		const compra = this.compras.find((t) => t.id === codigo);
		if (compra) {
			return compra.total;
		}
		return 0;
	}



	inc({ codigo, nombre, online, tipo }: App.Precio) {
		const compra = this.compras.find((t) => t.id === codigo);
		if (compra) {
			compra.cantidad++;
			compra.total = compra.cantidad * compra.precio;
		} else {
			this.compras.push({
				id: codigo,
				tipo: 'entrada',
				tipoPrecio: tipo,
				codigo,
				nombre,
				precio: online,
				cantidad: 1,
				total: online,
				parcializada:false
			});
		}
	}

	dec(codigo: string) {
		const compra = this.compras.find((t) => t.id === codigo);
		if (compra) {
			compra.cantidad--;
			compra.total = compra.cantidad * compra.precio;

			if (compra.cantidad == 0) {
				this.del(compra);
			}
		}
	}

	incProducto(producto: App.Producto, comercio: App.Comercio) {
		const compra = this.compras.find((t) => t.id === producto.id);
		if (compra) {
			compra.cantidad++;
			compra.total = compra.cantidad * compra.precio;
		} else {
			this.compras.push({
				id: producto.id,
				tipo: 'producto',
				tipoPrecio: `${comercio.tipo}`,
				codigo: `${comercio.id}_${comercio.tenant}`,
				nombre: producto.nombre,
				precio: producto.precio,
				cantidad: 1,
				total: producto.precio,
				parcializada:false
			});
		}
	}

	decProducto(id: string) {
		const compra = this.compras.find((t) => t.id === id);
		if (compra) {
			compra.cantidad--;
			compra.total = compra.cantidad * compra.precio;

			if (compra.cantidad == 0) {
				this.del(compra);
			}
		}
	}

	setDescuentos(precios: App.Precio[], codigo: string) {
		for(let cadaCompra of this.compras){
			const precio = precios.find(t => t.codigo == cadaCompra.codigo);
			if(precio?.descuentos?.some(d => d.tipo == "Codigo" && d.nombre.toLocaleLowerCase() == codigo.toLocaleLowerCase())){
				const descuentoEncontrado = precio.descuentos.find(d => d.tipo == "Codigo" && d.nombre.toLocaleLowerCase() == codigo.toLocaleLowerCase());
				if(descuentoEncontrado){
					cadaCompra.precio = descuentoEncontrado.online;
					cadaCompra.total = cadaCompra.cantidad * cadaCompra.precio;
				}
			}
		}
	}

	setMapa(mapa: string) {
		this.mapa = mapa;
		this.tab = 'mapa';
	}

	constructor(evento: App.Evento, comercios: App.Comercio[], descuento: App.User | null) {
		this.slug = evento.id;
		this.comercio = comercios[0].id;
		this.compras = [];
		this.descuento = descuento?.descuentos?.descuento ?? 0;
		this.codigoDescuento = '';
	}
}

export function getReserva(evento: App.Evento, comercios: App.Comercio[], descuento: App.User | null) {
	return new ReservaState(evento, comercios, descuento);
}
