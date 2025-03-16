<script lang="ts">
	import Star from '$lib/icons/Star.svelte';
	import { number } from 'zod';
	import Rating from '../Shared/ui/Rating.svelte';
	let panel = $state('calificar');
</script>

<div class="botonera">
	{#if panel == ''}
		<button class="btn" onclick={() => (panel = 'calificar')}>Calificar</button>
		<button class="btn--outline" onclick={() => (panel = 'interesa')}>No me interesa</button>
		<button class="btn--outline" onclick={() => (panel = 'reportar')}>Reportar</button>
	{/if}
</div>
{#if panel == 'calificar'}
	<div class="flexed centrado">
		<Rating />
	</div>
{/if}

{#if panel == 'interesa'}
	<button class="btn--outline" onclick={() => (panel = '')}>No me interesa</button>
{/if}

{#if panel == 'reportar'}
	<button class="btn--outline" onclick={() => (panel = '')}>Reportar</button>
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
