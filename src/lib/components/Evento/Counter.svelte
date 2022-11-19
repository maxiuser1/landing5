<script lang="ts">
	import { Decrease, Increase } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';

	import { spring } from 'svelte/motion';
	export let precio: number;
	let total: number;
	let tope: number = 10;
	export let count: number = 0;

	$: total = Math.ceil(count * precio * 10) / 10;
	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	const dispatch = createEventDispatcher();
	function handleClick() {
		if (count < 0) count = 0;
		dispatch('cambiado', { count });
	}
</script>

<div class="counter">
	<button
		type="button"
		on:click={() => {
			count -= 1;
			if (count <= tope) {
				handleClick();
			}
		}}
		aria-label="Disminiuir"
	>
		<Decrease />
	</button>
	<div class="counter-viewport">
		<div class="counter-digits">
			{count}
		</div>
	</div>
	<button
		type="button"
		on:click={() => {
			count += 1;
			if (count <= tope) {
				handleClick();
			}
		}}
		aria-label="Aumentar"
	>
		<Increase />
	</button>
</div>

<div class="contenedor">
	<div class="precio">
		S/ {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	</div>
</div>

<style>
	.precio {
		font-weight: 900;
		font-size: 18px;
		line-height: 16px;
		color: #d30ed1;
		text-align: right;
	}

	.contenedor {
		display: flex;
		flex-direction: column;
	}
	.counter {
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 10px;
		margin-bottom: 10px;
	}

	.counter button {
		padding: 0;
		display: flex;
		align-items: bottom;
		justify-content: center;
		background: none;
		border: none;
		padding: 0px;
		touch-action: manipulation;
	}

	.counter-digits {
		font-weight: 900;
		font-size: 18px;
		line-height: 16px;
	}
</style>
