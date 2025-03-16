<script lang="ts">
	import Rating from '../Shared/ui/Rating.svelte';
	let { comprometer } = $props();
	let panel = $state('');
	let motivos = $state([
		'Cancelación o Cambio de Fecha',
		'Sospecha de Fraude',
		'Falta de Información',
		'Problemas con la Compra de Entradas',
		'Preocupaciones de Seguridad o Logística'
	]);

	function califcado(val: number) {
		panel = '';
		comprometer('calificar', val.toString());
	}
</script>

<div class="botonera">
	{#if panel == ''}
		<button class="btn" onclick={() => (panel = 'calificar')}>Calificar</button>
		<button
			class="btn--outline"
			onclick={() => {
				panel = '';
				comprometer('nomeinteresa', '');
			}}>💔 No me interesa</button
		>
		<button class="btn--outline" onclick={() => (panel = 'reportar')}>🚩Reportar</button>
	{/if}
</div>
{#if panel == 'calificar'}
	<div class="flexed centrado">Calificar</div>
	<div class="flexed centrado">
		<Rating {califcado} />
	</div>
{/if}

{#if panel == 'reportar'}
	<div class="botonera">
		{#each motivos as motivo}
			<button
				class="btn--outline"
				onclick={() => {
					panel = '';
					comprometer('reportar', motivo);
				}}>{motivo}</button
			>
		{/each}
	</div>
{/if}

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;

	.botonera {
		display: flex;
		flex-direction: column;
		gap: 24px;

		max-width: 95vw;
		min-width: 95vw;
		@include mixin.breakpoint(mixin.$sm) {
			max-width: 350px;
			min-width: 350px;
		}
	}
</style>
