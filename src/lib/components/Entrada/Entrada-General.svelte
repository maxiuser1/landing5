<script lang="ts">
	import { Redem, Trash } from '$lib/icons';
	import { page } from '$app/state';
	import { soles } from '$lib/shared/formatos';
	import CompraGeneral from '../Evento/Reserva/Compra-General.svelte';
	import Copier from '../Shared/ui/Copier.svelte';
	import Share from '$lib/icons/Share.svelte';
	import Sell from '$lib/icons/Sell.svelte';
	let { entrada } = $props();
	let { compra, ticketing } = entrada;
</script>

<div class="titulos">
	<div>
		{compra.nombre}
		{#if compra.cantidad > 1}
			<small>x{compra.cantidad}</small>
		{/if}
	</div>
	<div class="derecha">{soles(compra.total)}</div>
	<div class="botonera"></div>
</div>

<div class="filas">
	{#if ticketing.paraMi!.cantidad > 0 || ticketing.total != compra.cantidad}
		<div class="fila">
			<div>Mis entradas</div>
			<div></div>
			<div class="botonera">
				{#if compra.cantidad > 1}
					<CompraGeneral
						cantidad={ticketing.paraMi?.cantidad}
						inc={() => ticketing.paraMi!.cantidad++}
						dec={() => ticketing.paraMi!.cantidad--}
						disabledInc={ticketing.disabled}
					/>
				{:else}
					<CompraGeneral
						cantidad={ticketing.paraMi?.cantidad}
						inc={() => ticketing.paraMi!.cantidad++}
						dec={() => ticketing.paraMi!.cantidad--}
						disabledInc={true}
						disabledDec={true}
					/>
				{/if}
			</div>
		</div>
	{/if}

	{#if ticketing.invitados.length > 0}
		{#each ticketing.invitados as ticket, idx}
			<div class="fila">
				<div class="flexed">
					<Redem />
					<Copier texto={`${page.url.href}/invitados/${compra.id}`} />
				</div>
				<div></div>
				<div class="botonera">
					{#if compra.cantidad > 1}
						<CompraGeneral
							cantidad={ticket.cantidad}
							inc={() => ticketing.incInvitado(ticket)}
							dec={() => ticketing.decInvitado(ticket)}
							disabledInc={ticketing.disabled}
						/>
					{:else}
						<button class="btn--icon" onclick={() => ticketing.delInvitado(ticket.id)}><Trash /></button>
					{/if}
				</div>
			</div>
		{/each}
	{/if}

	{#if ticketing.traspasos.length > 0}
		{#each ticketing.traspasos as ticket, idx}
			<div class="fila">
				<div class="flexed">
					<Share />
					<Copier texto={`${page.url.href}/invitados/${compra.id}`} />
				</div>
				<div></div>

				<div class="botonera">
					{#if compra.cantidad > 1}
						<CompraGeneral
							cantidad={ticket.cantidad}
							inc={() => ticketing.incTraspaso(ticket)}
							dec={() => ticketing.decTraspaso(ticket)}
							disabledInc={ticketing.disabled}
						/>
					{:else}
						<button class="btn--icon" onclick={() => ticketing.delTraspaso(ticket.id)}><Trash /></button>
					{/if}
				</div>
			</div>
		{/each}
	{/if}

	{#if ticketing.reventas.length > 0}
		{#each ticketing.reventas as ticket, idx}
			<div class="fila">
				<div class="flexed">
					<Sell />
				</div>
				<div></div>

				<div class="botonera">
					{#if compra.cantidad > 1}
						<CompraGeneral
							cantidad={ticket.cantidad}
							inc={() => ticketing.incReventa(ticket)}
							dec={() => ticketing.decReventa(ticket)}
							disabledInc={ticketing.disabled}
						/>
					{:else}
						<button class="btn--icon" onclick={() => ticketing.delReventa(ticket.id)}><Trash /></button>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</div>
{#if ticketing.invitados.length < compra.cantidad}
	<div class="acciones mt-20">
		<button class="btn--outline" onclick={() => ticketing.addInvitado()}><Redem /> Invitar</button>
		<button class="btn--outline" onclick={() => ticketing.addTraspaso()}><Share /> Traspasar</button>
		<button class="btn--outline" onclick={() => ticketing.addReventa()}><Sell /> Revender</button>
	</div>
{/if}

{#if ticketing.total !== compra.cantidad}
	<div class="error">
		{ticketing.total > compra.cantidad ? 'Los tickets superan la cantidad comprada' : 'Faltan distribuír tickets'}
	</div>
{/if}

<style lang="scss">
	.filas {
		display: flex;
		flex-direction: column;
		gap: 24px;
		margin-bottom: 24px;
	}

	.fila {
		gap: 12px;
		align-items: center;
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
	}

	.titulos {
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
		margin-bottom: 20px;
	}

	.botonera {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	.acciones {
		display: flex;
		justify-content: flex-start;
		gap: 8px;
	}

	.btn--outline {
		display: flex;
		gap: 8px;
		align-items: center;
	}
</style>
