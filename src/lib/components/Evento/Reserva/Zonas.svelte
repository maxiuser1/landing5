<script lang="ts">
	import Arrow from '$lib/icons/Arrow.svelte';
	import AsientoPicker from './Asiento-Picker.svelte';
	import BoxPicker from './Box-Picker.svelte';
	import Tickets from './Tickets.svelte';

	let { evento, reserva } = $props();
</script>

{#if reserva.tab == 'inicio'}
	<section class="minicontainer">
		<p>Seleccione sus entradas:</p>
		<div class="mapa">
			<img src={evento.caratula.mapa} alt="mapa" />
		</div>

		<Tickets {evento} {reserva} />

		<div class="botonera">
			<button class="btn mt-40" onclick={() => (reserva.tab = 'comercios')}>Continuar <Arrow /></button>
		</div>
	</section>
{/if}

{#if reserva.tab == 'mapa'}
	<section class="minicontainer">
		<h4>Lugar</h4>
		<p>Seleccione su lugar:</p>

		{#each evento.precios as precio}
			{#if precio.tipo == 'BOX' && reserva.mapa == precio.codigo}
				<BoxPicker {reserva} {precio} confirmar={() => reserva.goInicio()} />
			{/if}
			{#if precio.tipo == 'Asientos' && reserva.mapa == precio.codigo}
				<AsientoPicker {reserva} {precio} confirmar={() => reserva.goInicio()} />
			{/if}
		{/each}
	</section>
{/if}

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;

	.botonera {
		display: flex;
		justify-content: flex-end;
	}

	.mapa {
		display: flex;
		justify-content: center;
		img {
			max-width: 250px;
		}
	}
</style>
