<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let color: string = '#D4D4D4';
	export let disabled: boolean;
	export let width: number;
	export let tomados: number = 0;
	let tomado = false;
	// let height: number = width * 0.7;

	function evaluar(indice: number) {
		if (indice <= tomados) return 'blue';
		return tomado ? '#ff5260' : '#D4D4D4';
	}

	const dispatch = createEventDispatcher();
	function handleClick() {
		tomado = !tomado;
		dispatch('clickeado', {});
	}
</script>

{#if disabled}
	<svg viewBox="0 0 112 60" {width} xmlns="http://www.w3.org/2000/svg">
		<g class="layer">
			<title />
			<rect fill="none" height="8" id="svg_2" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="15.44" y="51" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_8" rx="4" width="22.75" x="44.75" y="51" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_9" rx="4" width="22.75" x="73.75" y="51" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_10" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="15.44" y="0.75" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_11" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="44.75" y="0.63" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_12" rx="4" width="22.75" x="73.75" y="0.38" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_13" rx="4" transform="matrix(0 -0.703351 1 0 81.875 91.6459)" width="22.75" x="65.43" y="-79.63" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_17" rx="4" transform="matrix(0 -0.643713 1 0 81.875 86.642)" width="22.75" x="92.62" y="-79.75" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_18" rx="4" transform="matrix(0 -0.703351 1 0 81.875 91.6459)" width="22.75" x="65.43" y="20.44" stroke="#D4D4D4" />
			<rect fill="none" height="8" id="svg_19" rx="4" transform="matrix(0 -0.703351 1 0 81.875 91.6459)" width="22.75" x="89.95" y="20.56" stroke="#D4D4D4" />
			<rect fill="none" height="36" id="svg_20" rx="4" width="81.62" x="15.44" y="11.63" stroke="#D4D4D4" />
		</g>
	</svg>
{:else}
	<!-- <svg on:click={handleClick} {width} viewBox="0 0 14 12"  xmlns="http://www.w3.org/2000/svg" fill={color}>
		<path
			d="M1 0 3 0A1 1 90 013 2L1 2A1 1 90 011 0ZM6 0 8 0A1 1 90 018 2L6 2A1 1 90 016 0ZM11 0 13 0A1 1 90 0113 2L11 2A1 1 90 0111 0ZM3 3 11 3A1 1 90 0111 9L3 9A1 1 90 013 3ZM1 10 3 10A1 1 90 013 12L1 12A1 1 90 011 10ZM6 10 8 10A1 1 90 018 12L6 12A1 1 90 016 10ZM11 10 13 10A1 1 90 0113 12L11 12A1 1 90 0111 10Z"
		/>
	</svg> -->
	<button on:click={handleClick} type="button" class="box">
		<svg viewBox="0 0 112 60" {width} xmlns="http://www.w3.org/2000/svg" class={tomado ? 'tomado' : 'vacio'}>
			<g class="layer">
				<title />
				<rect height="8" id="svg_2" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="15.44" y="51" stroke="#D4D4D4" />
				<rect height="8" id="svg_9" rx="4" width="22.75" x="73.75" y="51" />
				<rect height="8" id="svg_10" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="15.44" y="0.75" />
				<rect height="8" id="svg_11" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="44.75" y="0.63" />
				<rect height="8" id="svg_12" rx="4" width="22.75" x="73.75" y="0.38" />
				<rect height="8" id="svg_13" rx="4" transform="matrix(0 -0.703351 1 0 81.875 91.6459)" width="22.75" x="65.43" y="-79.63" />
				<rect height="8" id="svg_17" rx="4" transform="matrix(0 -0.643713 1 0 81.875 86.642)" width="22.75" x="92.62" y="-79.75" />
				<rect height="8" id="svg_18" rx="4" transform="matrix(0 -0.703351 1 0 81.875 91.6459)" width="22.75" x="65.43" y="20.44" />
				<rect height="8" id="svg_19" rx="4" transform="matrix(0 -0.703351 1 0 81.875 91.6459)" width="22.75" x="89.95" y="20.56" />

				<rect height="8" id="box9" rx="4" width="22.75" x="44.75" y="51" />

				<rect height="36" id="mesa" rx="4" width="81.62" x="15.44" y="11.63" />
			</g>
		</svg>
	</button>
{/if}

<style lang="scss">
	.vacio rect {
		fill: #d4d4d4;
	}

	.tomado rect {
		fill: #ff888f;
	}

	.box:hover rect {
		@include breakpoint($md) {
			fill: #ff888f;
			pointer-events: all;
		}
	}

	.box {
		background: none;
		border: none;
	}
</style>
