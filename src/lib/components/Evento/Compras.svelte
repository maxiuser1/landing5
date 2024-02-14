<script lang="ts">
	import { Trash } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	import { compraData } from './esto';

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

<h4>Resumen</h4>

{#if $compraData && $compraData.entradas}
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
{/if}

<div class="row totales">
	<div class="" />
	<div class="columnm">
		<div>
			Total <b> S/. {$compraData.total} </b>
		</div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';

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

	.columnm {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: space-between;
		gap: 40px;
	}

	.totales {
		margin-top: 32px;
	}

	section.resumen {
		max-width: 728px;
		width: 728px;
		border-radius: 8px;
		background: #f9f9f9;
		margin-bottom: 48px;
		padding: 32px;
	}
</style>
