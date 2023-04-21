<script lang="ts">
	import { Deathbox, Decrease, Increase } from '$lib/icons';
	import { page } from '$app/stores';
	import { letrar } from '$lib/utils/letrador';
	import Regalo from './Regalo.svelte';
	import { compraData } from './store';
	import { createEventDispatcher, onMount } from 'svelte';

	export let entrada: App.Sentado;
	export let zona: App.Precio;

	const fila = zona.filas.find((t) => t.id == entrada.fila);
	const asiento = fila?.sits.find((t) => t.id == entrada.asiento);

	const esPromotor = $page.data?.user?.rol != undefined && $page.data?.user?.rol == 'promotor';

	let precio: number = esPromotor ? zona.promotor : zona.online;
	let precioIndividual: number = esPromotor ? zona.promotori! : zona.onlinei!;
	let total: number = 0;
	let tope: number = asiento.c ? zona.tope! - asiento.c : zona.tope!;
	let regalo: string = zona.regalo ?? '';

	export let count: number = tope;
	total = count == zona.tope ? precio : count * precioIndividual;

	const dispatch = createEventDispatcher();
	onMount(() => {
		compraData.update((current) => ({
			...current,
			entradas: current.entradas?.map((currentEntrada) => {
				if (currentEntrada.fila == entrada.fila && currentEntrada.asiento == entrada.asiento) {
					const entradaUpdated = { ...currentEntrada, cantidad: count, final: total };
					return entradaUpdated;
				}
				return { ...currentEntrada };
			})
		}));
	});

	function handleClick(count: number) {
		total = count == zona.tope ? precio : count * precioIndividual;

		if (count <= 0) count = 1;

		if (count == 1) {
			regalo = zona.regaloIndividual?.una ?? '';
		} else {
			regalo = count < tope ? zona.regaloIndividual?.varias?.replaceAll('[cantidad]', `(0${count.toString()})`) ?? '' : zona.regalo ?? '';
		}

		compraData.update((current) => ({
			...current,
			entradas: current.entradas?.map((currentEntrada) => {
				if (currentEntrada.fila == entrada.fila && currentEntrada.asiento == entrada.asiento) {
					const entradaUpdated = { ...currentEntrada, cantidad: count, final: total, regalo: regalo };
					return entradaUpdated;
				}
				return { ...currentEntrada };
			})
		}));

		dispatch('cambiado');
	}
</script>

<div class="box">
	<div class="asiento">
		<div>
			<Deathbox width={40} disabled={false} tomado={true} />
		</div>
		<div class="etiquetas">
			<h6><strong>{zona.nombre}</strong></h6>
			<h6>{letrar(entrada?.fila ?? 0)}-{entrada.asiento}</h6>
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

		<div class="contenedor">
			<div class="precio">
				S/ {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			</div>
		</div>
	</div>
	<Regalo {regalo} />
</div>

<style lang="scss">
	@import './static/style.scss';
	.box {
		min-width: 300px;
		padding: 32px;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;

		@include breakpoint($sm) {
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
