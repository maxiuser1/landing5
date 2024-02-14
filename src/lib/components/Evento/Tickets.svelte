<script lang="ts">
	import { onMount } from 'svelte';

	import Contador from './Contador.svelte';
	import { compraData } from './esto';
	import { EventosRepo } from '$lib/repos';
	import Trash from '$lib/icons/Trash.svelte';
	import Entradas from './Entradas.svelte';
	import Arrow from '$lib/icons/Arrow.svelte';
	import Compras from './Compras.svelte';
	import Increase from '$lib/icons/Increase.svelte';
	import { createEventDispatcher } from 'svelte';

	export let evento: App.Evento;
	const dispatch = createEventDispatcher();

	onMount(async () => {
		compraData.update((current) => {
			return {
				...current,
				entradas:
					!current?.entradas || current.entradas?.length == 0
						? evento.precios.map((t) => {
								return {
									tipo: t.tipo,
									cantidad: 0,
									total: 0,
									precio: t.onlinei,
									lugares: [],
									numerado: t.numerado ? true : false
								};
						  })
						: current.entradas,
				total: !current?.entradas || current.entradas?.length == 0 ? 0 : current.entradas.reduce((acc, t) => acc + t.total, 0)
			};
		});
	});

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

		compraData.update((current) => ({
			...current,
			total: current.entradas.reduce((acc, t) => acc + t.total, 0)
		}));
	};
</script>

<section class="gris">
	<div class="tabla-precios">
		<div class="row">
			<div class="column">Ticket</div>
			<div class="columnm">
				<div class="column">Precio</div>
				<div class="column cantidad contadores">Cantidad</div>
			</div>
		</div>

		{#if $compraData && $compraData.entradas}
			{#each $compraData.entradas as entrada}
				{#if !entrada.numerado}
					<div class="row">
						<div class="column precio-nombre">{entrada.tipo}</div>
						<div class="columnm">
							<div class="column">S/. {entrada.precio}</div>
							<div class="column contadores">
								<Contador count={entrada.cantidad} on:cambiado={(e) => handleCambioCantidad(e.detail.count, entrada.tipo)} />
							</div>
						</div>
					</div>
				{:else}
					<div class="row">
						<div class="column precio-nombre">{entrada.tipo}</div>
						<div class="columnm">
							<div class="column">S/. {entrada.precio}</div>
							<div class="column contadores increaseable">
								<button
									class="button-icon"
									type="button"
									on:click={() => {
										dispatch('seleccionar', { zona: entrada.tipo });
									}}
								>
									<Increase />
								</button>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</section>
{#if $compraData && $compraData.total > 0}
	<section class="resumen">
		<Compras />
	</section>
	<section class="continuar">
		<button class="btn">Continuar &nbsp;&nbsp;<Arrow /></button>
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';

	.increaseable {
		display: flex;
		justify-content: flex-end;
	}

	.contadores {
		min-width: 200px;
		width: 200px;
	}

	section.continuar {
		text-align: center;
		margin-bottom: 40px;

		button {
			min-width: 300px;
			font-weight: 800;
		}
	}

	.button-icon {
		padding: 0;
		display: flex;
		align-items: bottom;
		justify-content: center;
		background: none;
		border: none;
		padding: 0px;
		touch-action: manipulation;
	}

	section.gris {
		max-width: 728px;
		width: 728px;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		margin-bottom: 24px;
		background: #f9f9f9;
	}

	.tabla-precios {
		display: flex;
		flex-direction: column;
		padding: 24px;
		height: 100%;
	}

	.row {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.column {
		padding: 10px;
	}

	.columnm {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: space-between;
		gap: 40px;
	}

	.precio-nombre {
		font-weight: 600;
	}

	.cantidad {
		text-align: right;
	}
</style>
