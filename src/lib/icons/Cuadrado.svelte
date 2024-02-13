<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let numero: number;
	export let tomado = false;
	export let disabled = false;
	// let height: number = width * 0.7;

	function evaluar(indice: number) {
		return tomado ? '#ff5260' : '#D4D4D4';
	}

	const dispatch = createEventDispatcher();
	function handleClick() {
		tomado = !tomado;
		dispatch('clickeado', { state: tomado });
	}
</script>

{#if disabled}
	<div class="caja caja--disabled">{numero}</div>
{:else}
	<!-- <svg on:click={handleClick} {width} viewBox="0 0 14 12"  xmlns="http://www.w3.org/2000/svg" fill={color}>
		<path
			d="M1 0 3 0A1 1 90 013 2L1 2A1 1 90 011 0ZM6 0 8 0A1 1 90 018 2L6 2A1 1 90 016 0ZM11 0 13 0A1 1 90 0113 2L11 2A1 1 90 0111 0ZM3 3 11 3A1 1 90 0111 9L3 9A1 1 90 013 3ZM1 10 3 10A1 1 90 013 12L1 12A1 1 90 011 10ZM6 10 8 10A1 1 90 018 12L6 12A1 1 90 016 10ZM11 10 13 10A1 1 90 0113 12L11 12A1 1 90 0111 10Z"
		/>
	</svg> -->
	<button on:click={handleClick} type="button" class="box" />
{/if}

<style lang="scss">
	@import './static/style.scss';
	@import './static/style.scss';

	.caja {
		width: 24px;
		height: 24px;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		background-color: #9e9e9e;
		&--disabled {
			background-color: #9e9e9e;
		}
	}
</style>
