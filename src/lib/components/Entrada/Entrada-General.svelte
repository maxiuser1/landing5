<script lang="ts">
	import { Qrcode, Trash } from '$lib/icons';
	import { page } from '$app/state';
	import { soles } from '$lib/shared/formatos';
	import CompraGeneral from '../Evento/Reserva/Compra-General.svelte';
	import Copier from '../Shared/ui/Copier.svelte';
	import { getTickets } from '../../../routes/(qh)/entrada/[id]/tickets.svelte';
	let { compra, tickets } = $props();

	let ticketing = getTickets(compra, tickets);
</script>

<div class="titulos">
	<div>
		{compra.nombre}
		{#if compra.cantidad > 1}
			<small>x{compra.cantidad}</small>
		{/if}
	</div>
	<div class="precio">{soles(compra.total)}</div>
	<div class="botonera">
		{#if ticketing.paraMi!.cantidad > 0 || ticketing.total != compra.cantidad}
			{#if compra.cantidad > 1}
				<CompraGeneral
					cantidad={ticketing.paraMi?.cantidad}
					inc={() => ticketing.paraMi!.cantidad++}
					dec={() => ticketing.paraMi!.cantidad--}
					disabledAdd={ticketing.disabled}
				/>
			{:else}
				{ticketing.paraMi?.cantidad} ticket
			{/if}
		{/if}
	</div>
</div>

<div>
	{#each ticketing.invitados as ticket, idx}
		<div class="fila">
			<Copier texto={`${page.url.href}/invitados/${compra.id}`} />
			<div class="botonera">
				{#if compra.cantidad > 1}
					<CompraGeneral
						cantidad={ticket.cantidad}
						inc={() => ticketing.inc(ticket)}
						dec={() => ticketing.dec(ticket)}
						disabledAdd={ticketing.disabled}
					/>
				{:else}
					<button class="btn--icon" onclick={() => ticketing.del(ticket.id)}><Trash /></button>
				{/if}
			</div>
		</div>
	{/each}
	<div class="fila ultima">
		<div></div>
		<div class="botonera">
			{#if ticketing.invitados.length < compra.cantidad}
				<button class="btn--outline" onclick={() => ticketing.add()}>Invitado</button>
			{/if}
			{#if ticketing.paraMi!.cantidad > 0}
				<button class="btn">Mi ticket</button>
			{/if}
		</div>
	</div>
</div>

{#if ticketing.total !== compra.cantidad}
	<div class="error">
		{ticketing.total > compra.cantidad ? 'Los tickets superan la cantidad comprada' : 'Faltan distribuír tickets'}
	</div>
{/if}

<style lang="scss">
	.error {
		background-color: #ffdadb;
		padding: 12px;
		color: #ff888f;
		border-radius: 8px;
		margin-top: 8px;
	}

	.fila {
		margin-top: 24px;
		gap: 12px;
		align-items: center;
		justify-content: space-between;
		display: flex;
	}

	.titulos {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.botonera {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}
</style>
