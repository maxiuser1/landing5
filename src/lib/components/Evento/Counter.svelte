<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import { spring } from 'svelte/motion';
	export let precio: number;
	let total: number;
	export let count: number = 0;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);
	$: total = count * precio;
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

<div class="contenedor">
	<div class="counter">
		<button
			on:click={() => {
				count -= 1;
				handleClick();
			}}
			aria-label="Decrease the counter by one"
		>
			-
		</button>
		<div class="numero">
			<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
				<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
				<strong>{Math.floor($displayed_count)}</strong>
			</div>
		</div>
		<button
			on:click={() => {
				count += 1;
				handleClick();
			}}
			aria-label="Increase the counter by one"
		>
			+
		</button>
	</div>
	<div>
		<h4>
			S/ {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
		</h4>
	</div>
</div>

<style>
	.contenedor {
		display: flex;
		gap: 20px;
	}
	.counter {
		display: flex;
		padding: 2px;
		background-color: #f9f9f9;
	}

	.counter button {
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #f9f9f9;
		background-color: #f9f9f9;
		padding: 0px 10px;
		touch-action: manipulation;
		font-size: 1rem;
	}

	.counter button:hover {
		background-color: #d1cbcb;
	}

	.counter-viewport {
		width: 2em;
		height: 1em;
		overflow: hidden;
		text-align: center;
		vertical-align: middle;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--accent-color);
		font-size: 1rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
