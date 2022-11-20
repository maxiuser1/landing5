<script lang="ts">
	import { Decrease, Increase } from '$lib/icons';
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
					final: total
				}
			]
		}));

		dispatch('cambiado', { count });
	}
</script>

<div class="box">
	<div class="asiento">
		<div>
			<Ticket />
		</div>
		<div class="etiquetas">
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

<Regalo {regalo} />
{#if zona.descuento}
	<Descuento descuento={zona.descuento.nombre + ' -' + zona.descuento.descuento + '%'} />
{/if}

<style lang="scss">
	.box {
		min-width: 300px;
		padding: 32px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;

		@include breakpoint($sm) {
			flex-direction: row;
			min-width: 400px;
		}

		@include breakpoint($md) {
			min-width: 500px;
		}
	}
	.asiento {
		display: flex;
		align-items: center;
		gap: 10px;

		.etiquetas {
			padding-left: 24px;
			h6 {
				margin-bottom: 6px;
			}
		}
	}

	.precio {
		font-weight: 900;
		font-size: 18px;
		line-height: 16px;
		color: #d30ed1;
		text-align: right;
	}

	.contenedor {
		display: flex;
		flex-direction: column;
	}
	.counter {
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 10px;
		margin-bottom: 10px;
	}

	.counter button {
		padding: 0;
		display: flex;
		align-items: bottom;
		justify-content: center;
		background: none;
		border: none;
		padding: 0px;
		touch-action: manipulation;
	}

	.counter-digits {
		font-weight: 900;
		font-size: 18px;
		line-height: 16px;
	}
</style>
