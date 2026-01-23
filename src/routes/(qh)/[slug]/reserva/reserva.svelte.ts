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
		compra.cantidad++;

		if(compra.cantidad > compra.restantes!){
			compra.cantidad--;
			return;
		}

		const compraFull = compra.cantidad == compra.sitLimite;
		console.log('compraFull', compraFull, compra.cantidad);
		if(compraFull) {
			console.log('compraFull',compra.cantidad, compra.online, compra.total);
			compra.precio = compra.online;
			compra.total = compra.online;
		}
		else {
			compra.precio = compra.onlinei;
			compra.total = compra.onlinei * compra.cantidad;
		}

	}

	addBox(precio: App.Precio, fila: App.Fila, sit: App.Sit, tagFila: string, tagSit: string) {
		const permiteCompraParcial = sit.l != sit.cmin;
		let compraBox = {
			id: `${precio.codigo}-${tagFila}-${tagSit}`,
			codigo: precio.codigo,
			tipoPrecio: precio.tipo,
			tipo: 'entrada',
			nombre: `${precio.nombre}, box ${tagFila}-${tagSit}`,
			online :  precio.online,
			onlinei: precio.onlinei,
			sitLimite: sit.l,
			sitCantidad: sit.c,
			fila: fila.id,
			sit: sit.id,
			parcializada: permiteCompraParcial,
			restantes: permiteCompraParcial ? sit.l - sit.c : sit.l,
			cantidad: permiteCompraParcial ? 1 : sit.l,
			precio: permiteCompraParcial ? precio.onlinei : precio.online,
			total: permiteCompraParcial ? precio.onlinei : precio.online,
		};
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
			parcializada:false,
			online: precio.online,
			onlinei: precio.onlinei,
			sitLimite: sit.l,
			sitCantidad: sit.c,
			restantes: sit.l - sit.c,
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
				parcializada:false,
				online: online,
				onlinei: online,
				sitLimite: 0,
				sitCantidad: 0,
				restantes: 0,
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
				parcializada:false,
				online: producto.precio,
				onlinei: producto.precio,
				sitLimite: 0,
				sitCantidad: 0,
				restantes: 0,
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
					if(cadaCompra.tipoPrecio == 'BOX') {
						cadaCompra.precio = cadaCompra.cantidad == cadaCompra.sitLimite ? descuentoEncontrado.online : descuentoEncontrado.onlinei;
						cadaCompra.total = cadaCompra.cantidad == cadaCompra.sitLimite ? descuentoEncontrado.online: (cadaCompra.cantidad * descuentoEncontrado.onlinei);
					}
					else {
						cadaCompra.precio =  descuentoEncontrado.online;
						cadaCompra.total = cadaCompra.cantidad * cadaCompra.precio;
					}
					
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
		if(comercios?.length > 0)
		this.comercio = comercios[0].id;
		this.compras = [];
		this.descuento = descuento?.descuentos?.descuento ?? 0;
		this.codigoDescuento = '';
	}
}

export function getReserva(evento: App.Evento, comercios: App.Comercio[], descuento: App.User | null) {
	return new ReservaState(evento, comercios, descuento);
}
