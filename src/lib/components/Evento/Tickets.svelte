<script lang="ts">
	import Contador from './Contador.svelte';
	import { compraData } from './esto';
	import { createEventDispatcher } from 'svelte';

	export let evento: App.Evento;
	const dispatch = createEventDispatcher();

	const handleCambioCantidad = (count: number, tipo: string) => {
		compraData.update((current) => ({
			...current,
			entradas: current.entradas.map((t) => {
				if (t.tipo == tipo) {
					return { ...t, cantidad: count, total: count * t.precio };
				}
				return t;
			})
		}));

		if (evento.general?.categoria == 'Tours') {
			compraData.update((current) => ({
				...current,
				total: Number((current.entradas.reduce((acc, t) => acc + t.total, 0) * 1.0832).toFixed(1)),
				comision: Number((current.entradas.reduce((acc, t) => acc + t.total, 0) * 0.0832).toFixed(1))
			}));
		} else {
			compraData.update((current) => ({
				...current,
				total: Number(current.entradas.reduce((acc, t) => acc + t.total, 0)),
				comision: undefined
			}));
		}
	};
</script>

<section class="minicontainer">
	<div class="headings">
		<div>Ticket</div>
		<div class="cantidades">
			<div>Precio</div>
			<div class="hidden--sm">Cantidad</div>
		</div>
	</div>
	<div class="cuerpo">
		{#if $compraData && $compraData.entradas}
			{#each $compraData.entradas as entrada, idx}
				<div class="entrada" class:entrada--odd={idx % 2 == 0}>
					<div class="h7">{entrada.tipo}</div>
					<div class="cantidades">
						<div class="h7 precio">S/ {entrada.precio}</div>
						<div>
							{#if entrada.numerado}
								<Contador count={entrada.cantidad} on:cambiado={(e) => dispatch('seleccionar', { zona: entrada.tipo })} />
							{:else}
								<Contador count={entrada.cantidad} on:cambiado={(e) => handleCambioCantidad(e.detail.count, entrada.tipo)} />
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	section {
		background-color: #f9f9f9;
	}

	.headings {
		padding: 0px 24px;
		margin-bottom: 8px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.entrada {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px 24px;

		.precio {
			text-align: right;
		}
		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}

	.cantidades {
		display: flex;
		flex-direction: column;
		gap: 12px;
		@include breakpoint($md) {
			flex-direction: row;
			gap: 140px;
		}
	}

	.h7 {
		font-family: 'GothamBolder';
	}
</style>
