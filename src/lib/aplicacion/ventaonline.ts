export class VentaOnline {
    private evento : App.Evento;
    public constructor(evento: App.Evento)
    {
        this.evento = evento;
    }

    public tarificarNumerado(zona: App.Precio, cantidad:number){
        if(cantidad == zona.tope){
            zona.final = zona.online;
        }
        else{
            zona.final = zona.onlinei! * cantidad;
        }
        return zona;
    }

    public tarificarGeneral(zona: App.Precio, cantidad: number){
       
        if(zona.descuentos && zona.descuentos[0]){
            const descuento = zona.descuentos[0];
            zona.final = descuento.online * cantidad;
            zona.descuento = {
                nombre: descuento.nombre,
                descuento : descuento.descuento,
            };
        }
        else{
            zona.final = zona.online * cantidad;
        }

        return zona;
    }

    public tarificar(tipoZona: string, cantidad: number) : App.Precio {
        const zona : App.Precio | undefined = this.evento.precios.find((t:App.Precio) => t.tipo == tipoZona);
        
        if(!zona)  throw new Error("Zona no válida");

        if(zona.numerado)
            return this.tarificarNumerado(zona, cantidad);
        else
            return this.tarificarGeneral(zona, cantidad);
    }

    public tarificarEntrada(tipoZona: string, cantidad:number, entrada: any): App.Precio{
        const zona : App.Precio | undefined = this.evento.precios.find((t:App.Precio) => t.tipo == tipoZona);
        
        if(!zona)  throw new Error("Zona no válida");

        if(zona.numerado)
           {
            return this.tarificarNumerado(zona, cantidad);
           }
        else
           {
            console.log('entrada', entrada);
            if(entrada.descuento && entrada.descuento.nombre)
            {
                const descuentoAplicado = zona.descuentos?.find(t => t.nombre == entrada.descuento.nombre);
                zona.final = descuentoAplicado!.online * cantidad;
                return zona;
            }
            return this.tarificarGeneral(zona, cantidad);
        }
    }
}


