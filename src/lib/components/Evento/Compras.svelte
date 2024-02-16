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

<div class="headings">
	<h4>Resumen</h4>
</div>

{#if $compraData && $compraData.entradas}
	<div class="cuerpo">
		{#each $compraData.entradas.filter((t) => t.cantidad > 0) as entrada, idx}
			<div class="entrada" class:entrada--odd={idx % 2 == 0}>
				<div>{entrada.cantidad} Ticket {entrada.tipo}</div>
				<div class="cantidades">
					<div class="h7 precio negrita">S/.{entrada.total}</div>
					<div>
						<button
							on:click={() => {
								handleCambioCantidad(0, entrada.tipo);
							}}
							class="button--icon"
						>
							<Trash />
						</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<div class="entrada totales">
	<div class="" />
	<div class="cantidades">
		<div class="totales">
			Total <span class="negrita"> S/. {$compraData.total} </span>
		</div>
		<div>
			<button class="button--icon">
				<Trash />
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';

	.totales {
		.button--icon {
			opacity: 0;
		}
	}

	.negrita {
		font-family: 'GothamBolder';
	}

	.totales {
		text-align: right;
	}

	.headings {
		padding: 32px 24px 13px;
	}

	.entrada {
		display: flex;
		flex-direction: row;
		align-items: center;
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
		align-items: center;
		flex-direction: row;

		gap: 12px;
		@include breakpoint($md) {
		}
	}
</style>
