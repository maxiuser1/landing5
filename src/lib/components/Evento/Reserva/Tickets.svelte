<script lang="ts">
	import { Silla, Sillon } from '$lib/icons';
	import { soles } from '$lib/shared/formatos';
	import Contador from './Contador.svelte';

	let { reserva, evento } = $props();
</script>

<div class="compra compra--title">
	<h5>Ticket</h5>
	<h5 class="precios">Precio</h5>
</div>
{#each evento.precios as precio, idx}
	<div class="compra" class:compra--odd={idx % 2 == 0}>
		<h6>{precio.nombre}</h6>
		<div class="precios">
			{soles(precio.online)}
		</div>
		{#if precio.tipo == 'General'}
			{@const cantidad = reserva.count(precio.codigo)}
			<Contador {cantidad} inc={() => reserva.inc(precio)} dec={() => reserva.dec(precio.codigo)} />
		{/if}
		{#if precio.tipo == 'BOX'}
			{@const activated = reserva.has(precio.codigo)}
			<div class="botonera">
				<button onclick={() => reserva.setMapa(precio.codigo)} class="btn--icon" class:acitivated={activated}>
					<Sillon />
				</button>
			</div>
		{/if}

		{#if precio.tipo == 'Asientos'}
			{@const activated = reserva.has(precio.codigo)}
			<div class="botonera">
				<button class="btn--icon" onclick={() => reserva.setMapa(precio.codigo)} class:acitivated={activated}>
					<Silla />
				</button>
			</div>
		{/if}
	</div>
{/each}

<style lang="scss">
	.botonera {
		display: flex;
		justify-content: flex-end;

		.acitivated {
			color: var(--red);
		}
		button {
			color: #777777;
			&:hover {
				color: var(--red);
			}
		}
	}
	.precios {
		text-align: right;
	}
	.compra {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		padding: 18px 32px;

		&--title {
			padding-bottom: 0px;
		}
		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}
</style>
