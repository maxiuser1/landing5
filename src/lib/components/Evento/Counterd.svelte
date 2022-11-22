<script lang="ts">
	import { Decrease, Descuento, Increase } from '$lib/icons';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { compraData } from './store';
	import Regalo from './Regalo.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';

	export let zona: App.Precio;
	export let entrada: App.Sentado;

	let count = 1;
	let tope: number = 50;
	let precio: number = zona.final!;
	let total: number = precio;

	let regalo: string = zona.regaloIndividual?.una ?? '';

	$: total = count * precio;

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
					final: total
				}
			]
		}));

		dispatch('cambiado', { count });
	}

	function descontar(ev: any) {
		const codigo = ev.target.value;
		if (codigo) {
			const descuento = zona.descuentos?.find((t) => t.nombre == codigo);
			precio = descuento?.promotor!;

			total = precio * count;

			compraData.update((current) => ({
				...current,
				entradas: [
					{
						...entrada,
						cantidad: count,
						regalo,
						final: total,
						descuento: {
							nombre: descuento?.nombre,
							valor: descuento?.descuento
						}
					}
				]
			}));
			dispatch('cambiado', { count });
		} else {
			precio = zona.final!;
			total = precio * count;

			compraData.update((current) => ({
				...current,
				entradas: [
					{
						...entrada,
						cantidad: count,
						regalo,
						final: total,
						descuento: null
					}
				]
			}));
			dispatch('cambiado', { count });
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
<div class="break-column" />
<div class="adiconales">
	<Regalo {regalo} />
	<!-- {#if zona.descuento}
		<Descuento descuento={zona.descuento.nombre + ' -' + zona.descuento.descuento + '%'} />
	{/if} -->
	{#if zona.descuentos}
		<div class="dsctos">
			<span>
				<Descuento />
			</span>
			<select name="descto" class="descto" on:change={descontar}>
				<option value="">Descuento</option>
				{#each zona.descuentos as descto}
					<option value={descto.nombre}>
						{descto.nombre}
					</option>
				{/each}
			</select>
		</div>
	{/if}
</div>

<style lang="scss">
	.descto {
		width: 100%;
	}
	.dsctos {
		display: flex;
		width: 100%;
	}
	.break-column {
		flex-basis: 100%;
		width: 0;
	}

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
			text-align: right;
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
