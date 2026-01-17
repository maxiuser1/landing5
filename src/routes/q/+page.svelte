<script lang="ts">
    const { data } = $props();
    const { entrada, invitado } = data;
</script>


<section>
    {#if invitado}
        Invitado: {JSON.stringify(invitado)}
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
                      {#each entrada.compras as compra}
                <tr>
                    <td>{compra.nombre} x {compra.cantidad}</td>
                    <td>
                        <button class="btn">Picar</button>
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
                        <button class="btn">Picar</button>
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
   
 