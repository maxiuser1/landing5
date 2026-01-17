<script lang="ts">
	import Contador from '$lib/components/Evento/Reserva/Contador.svelte';

    const { data } = $props();
    const { entrada, invitado } = data;
    let picados = $state(1);

    const picarCompra = async (compra: any) => {
       const payload = JSON.stringify({
        id: entrada.id,
        compra,
        tipo:'compra',
        picados:picados
       });
		const resp = await fetch('/api/picado', { method: 'POST', body: payload });
		const response = await resp.json();
        window.location.reload();
    };

    const picarInvitado = async(ticket:any) => {
         const payload = JSON.stringify({
        id: entrada.id,
        compra:ticket,
        tipo:'invitado',
        picados:0
       });
		const resp = await fetch('/api/picado', { method: 'POST', body: payload });
		const response = await resp.json();
        window.location.reload();
    }
</script>


<section>
    
    {#if invitado}
        
       <h4>Invitado</h4>
       <div>
         <table>
            <tbody>
                <tr>
                    <td>Cantidad: {invitado.cantidad}</td>
                    <td>
                        {#if invitado.estado == 'picado'}
                          <span style="color:red">YA FUE PICADO</span>
                        {:else}
                            <button class="btn" 
                                onclick={() => picarInvitado(invitado)}
                            >Picar</button>
                        {/if}
                    </td>
                </tr>
            </tbody>
         </table>
       </div>
    {:else}
       <h4>
        Compras
       </h4>
       <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <Contador cantidad={picados}
					inc={() => picados++}
					dec={() => picados--}
        />
                        </td>
                    </tr>
                        {#each entrada.compras as compra}
                <tr>
                    <td>{compra.nombre} x {compra.cantidad}</td>
                    <td>
                        {#if compra.picados}
                            {compra.picados} picados
                        {/if}
                        {#if compra.estado == 'picado'}
                    <span style="color:red">YA FUE PICADO</span>
                        {:else}
                          <button class="btn" 
                        onclick={() => picarCompra(compra)}
                        >Picar</button>
                        {/if}
                      
                    </td>
                </tr>
            {/each}
                </tbody>
            </table>
       </div>

        <br />
        <h4>Tickets</h4>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                            {#each entrada.tickets as ticket}
                <tr>
                    <td>{ticket.nombre}</td>
                    <td>
                        <button class="btn" 
                        onclick={() => picarInvitado(ticket)}
                        >Picar</button>
                    </td>
                </tr>
            {/each}
                </tbody>
            </table>
       </div>
    {/if}
</section>

<style lang="scss">
    section {
        padding: 20px;
        table {
            width: 100%;
            border-collapse: collapse;
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
        }
    }
</style>
   
 