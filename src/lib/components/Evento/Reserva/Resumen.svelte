<script lang="ts">
	import Trash from '$lib/icons/Trash.svelte';
	import { soles } from '$lib/shared/formatos';

	let { evento, reserva, descuento } = $props();
</script>

<h4>Resumen</h4>
{#each reserva.compras as compra, idx}
	<div class="compra" class:compra--odd={idx % 2 == 0}>
		<div>
			{compra.nombre}
			{#if compra.cantidad > 1}
				<small>x{compra.cantidad}</small>
			{/if}
		</div>
		<div class="precio">
			{soles(compra.total)}
		</div>
		<div class="botonera">
			<button onclick={() => reserva.del(compra)} class="btn--icon">
				<Trash />
			</button>
		</div>
	</div>
{/each}

<div class="compra">
	<div></div>
	<div class="precio">
		<div>
			<strong>
				Total:
				<span class="total" class:total--dscto={!!reserva.descuento} data-descuento="{reserva.descuento}%"
					>{soles(reserva.total)}
				</span>
			</strong>
		</div>
		{#if reserva.descontable}
			<small class="descontable">{soles(reserva.descontable)}</small>
		{/if}
	</div>
	<div></div>
</div>

<style lang="scss">
	.total {
		position: relative;
		font-size: 1.5em;
		&--dscto {
			&:after {
				content: attr(data-descuento);
				position: absolute;
				top: -12px;
				right: -24px;
				display: inline-block;
				transform: rotate(-25deg);
				background-color: red;
				color: #fff;
				padding: 4px;
				font-size: 10px;
				border-radius: 4px;
				margin-left: 4px;
			}
		}
	}

	.descuento {
		background-color: red;
		color: #fff;
		padding: 4px;
		font-size: 10px;
	}
	.descontable {
		text-decoration: line-through;
	}

	.precio {
		text-align: right;
	}
	.compra {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		padding: 18px 32px;

		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}

	.botonera {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
