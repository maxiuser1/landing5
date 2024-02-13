<script lang="ts">
	import { onMount } from 'svelte';

	import Contador from './Contador.svelte';
	import { compraData } from './esto';
	import { EventosRepo } from '$lib/repos';
	import Trash from '$lib/icons/Trash.svelte';
	import Entradas from './Entradas.svelte';
	import Arrow from '$lib/icons/Arrow.svelte';

	export let evento: App.Evento;

	onMount(async () => {
		compraData.update((current) => {
			return {
				...current,
				total: 0,
				entradas: evento.precios.map((t) => {
					return {
						tipo: t.tipo,
						cantidad: 0,
						total: 0,
						precio: t.onlinei
					};
				})
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
				<div class="column cantidad">Cantidad</div>
			</div>
		</div>

		{#if $compraData && $compraData.entradas}
			{#each $compraData.entradas as entrada}
				<div class="row">
					<div class="column precio-nombre">{entrada.tipo}</div>
					<div class="columnm">
						<div class="column">S/. {entrada.precio}</div>
						<div class="column">
							<Contador count={entrada.cantidad} on:cambiado={(e) => handleCambioCantidad(e.detail.count, entrada.tipo)} />
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>
{#if $compraData && $compraData.total > 0}
	<section class="resumen">
		<h4>Resumen</h4>

		{#each $compraData.entradas as entrada}
			{#if entrada.cantidad > 0}
				<div class="row">
					<div class="column>">
						{entrada.cantidad} Ticket {entrada.tipo}
					</div>
					<div class="columnm">
						<div class="column">
							S/.{entrada.total}
						</div>
						<div>
							<button
								on:click={() => {
									handleCambioCantidad(0, entrada.tipo);
								}}
								class="button-icon"
							>
								<Trash />
							</button>
						</div>
					</div>
				</div>
			{/if}
		{/each}

		<div class="row totales">
			<div class="" />
			<div class="columnm">
				<div>
					Total <b> S/. {$compraData.total} </b>
				</div>
			</div>
		</div>
	</section>

	<section class="continuar">
		<button class="btn">Continuar &nbsp;&nbsp;<Arrow /></button>
	</section>
{/if}

<style lang="scss">
	@import './static/style.scss';

	.totales {
		margin-top: 32px;
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

	section.resumen {
		max-width: 728px;
		width: 728px;
		border-radius: 8px;
		background: #f9f9f9;
		margin-bottom: 48px;
		padding: 32px;
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
