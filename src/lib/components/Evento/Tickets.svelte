<script lang="ts">
	import Decrease from '$lib/icons/Decrease.svelte';
	import { each, onMount } from 'svelte/internal';
	import Contador from './Contador.svelte';
	import { compraData } from './store';
	import Counter from './Counter.svelte';
	import { EventosRepo } from '$lib/repos';

	export let evento: App.Evento;
	let entradas: App.Contado[] = [];

	const handleCambioCantidad = (count: number, tipo: string) => {
		console.log('a', count, tipo);
		entradas.push({ cantidad: count, tipo });
	};
</script>

<section class="gris">
	<div class="tabla-precios">
		<div class="row">
			<div class="column">Ticket</div>
			<div class="column">Precio</div>
			<div class="column cantidad">Cantidad</div>
		</div>

		{#each evento.precios as precio}
			<div class="row">
				<div class="column precio-nombre">{precio.nombre}</div>
				<div class="column">S/. {precio.online}</div>
				<div class="column">
					<Contador on:cambiado={(e) => handleCambioCantidad(e.detail.count, precio.tipo)} />
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="resumen">
	<h4>Resumen</h4>
	{#each entradas as entrada}
		{entrada.tipo}
	{/each}
</section>

<style lang="scss">
	@import './static/style.scss';

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
		flex-wrap: nowrap;
	}

	.column {
		flex: 1;
		padding: 10px;
	}

	.precio-nombre {
		font-weight: 600;
	}

	.cantidad {
		text-align: right;
	}
</style>
