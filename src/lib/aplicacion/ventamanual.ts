export class VentaManual {
    private evento : App.Evento;
    public constructor(evento: App.Evento)
    {
        this.evento = evento;
    }

    public debeGenerarQR(tipoZona:string, cantidad: number) : boolean
    {
        const zona : App.Precio | undefined = this.evento.precios.find((t:App.Precio) => t.tipo == tipoZona);
       
        let generaQR = false;
        if(zona){
            if(zona.numerado){
                console.log('numerado');
                console.log('cantidad' , cantidad);
                console.log('tope', zona.tope);
                if(cantidad != zona.tope){
                    generaQR = true;
                }
            } else {
                if(zona!.qrcode){
                    generaQR = true;	 
                }
            }
        }
        
        return generaQR;
    }

    public tarificarNumerado(zona: App.Precio, cantidad:number){
        if(cantidad == zona.tope){
            zona.final = zona.promotor;
        }
        else{
            zona.final = zona.promotori! * cantidad;
        }
        return zona;
    }

    public tarificarGeneral(zona: App.Precio, cantidad: number){
       
        if(zona.descuentos && zona.descuentos[0]){
            const descuento = zona.descuentos[0];
            zona.final = descuento.promotor * cantidad;
            zona.descuento = {
                nombre: descuento.nombre,
                descuento : descuento.descuento,
            };
        }
        else{
            zona.final = zona.promotor * cantidad;
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
}


