<script lang="ts">
	import { Decrease, Descuento as Icondescuento, Gift, Increase } from '$lib/icons';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { compraData } from './store';
	import Regalo from './Regalo.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';
	import Descuento from './Descuento.svelte';

	export let zona: App.Precio;
	export let entrada: App.Sentado;

	let count = 1;
	let tope: number = 50;
	let precio: number = zona.final!;
	let total: number = precio;
	let codigodscto = '';
	let glosaDescuento = `${zona?.descuento?.nombre ?? ''} ${zona?.descuento?.descuento ?? ''}`;

	let regalo: string = zona.regaloIndividual?.una ?? '';

	const dispatch = createEventDispatcher();
	function handleClick(count: number) {
		total = precio * count;

		if (count <= 0) count = 1;

		if (count == 1) {
			regalo = zona.regaloIndividual?.una ?? '';
		} else {
			regalo = count < tope ? zona.regaloIndividual?.varias?.replaceAll('[cantidad]', `(0${count.toString()})`) ?? '' : zona.regalo ?? '';
		}

		compraData.update((current) => ({
			...current,
			entradas: [
				{
					...entrada,
					cantidad: count,
					regalo,
					total: total
				}
			]
		}));

		dispatch('cambiado', { count });
	}

	function aplicar() {
		if (codigodscto && zona.descuentos && zona.descuentos.find((t) => t.nombre == codigodscto.toLowerCase())) {
			const descuento = zona.descuentos.find((t) => t.nombre == codigodscto.toLowerCase());
			if (descuento && descuento?.online) {
				precio = descuento.online!;
				total = precio * count;
				glosaDescuento = `${descuento ? descuento.nombre : ''} ${descuento?.descuento ?? ''}%`;
				compraData.update((current) => ({
					...current,
					entradas: [
						{
							...entrada,
							cantidad: count,
							regalo,
							total: total,
							descuento: {
								nombre: descuento?.nombre,
								valor: descuento?.descuento
							}
						}
					]
				}));
				dispatch('cambiado', { count });
			}
		}
	}
</script>

<div class="fila">
	<div class="icono">
		<Ticket />
		<div class="zonita">
			<h6><strong>{zona.nombre}</strong></h6>
		</div>
	</div>
	<div>
		<div class="counter">
			<button
				type="button"
				on:click={() => {
					if (count >= 2) {
						count -= 1;
						handleClick(count);
					}
				}}
				aria-label="Disminiuir"
			>
				<Decrease />
			</button>
			<div class="counter-viewport">
				<div class="counter-digits">
					{count}
				</div>
			</div>
			<button
				type="button"
				on:click={() => {
					if (count < tope) {
						count += 1;
						handleClick(count);
					}
				}}
				aria-label="Aumentar"
			>
				<Increase />
			</button>
		</div>
		<div class="precio">
			S/ {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
		</div>
	</div>
</div>
<div class="adiconales">
	{#if regalo?.length > 1}
		<Regalo {regalo} />
	{/if}
	{#if glosaDescuento?.length > 1}
		<Descuento descuento={glosaDescuento} />
	{/if}
</div>
<div>
	<br />
	<div class="input-group">
		<input type="text" name="codigo" bind:value={codigodscto} placeholder="Código de descuento" class="form-control" />
		<button type="button" class="btn-outline" on:click={aplicar}>Aplicar</button>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';
	.adiconales {
		margin-top: 10px;
	}
	.fila {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
		justify-content: space-between;
		@include breakpoint($md) {
			flex-direction: row;
		}

		.precio {
			width: 100%;
			text-align: right;
			font-weight: 900;
			font-size: 18px;
			line-height: 16px;
			color: #d30ed1;
		}
	}

	.icono {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.counter {
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 10px;
		margin-bottom: 10px;

		&.counter button {
			padding: 0;
			display: flex;
			align-items: bottom;
			justify-content: center;
			background: none;
			border: none;
			padding: 0px;
			touch-action: manipulation;
		}
	}
</style>
