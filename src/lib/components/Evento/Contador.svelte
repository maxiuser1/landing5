<script lang="ts">
	import Decrease from '$lib/icons/Decrease.svelte';
	import Increase from '$lib/icons/Increase.svelte';
	import { createEventDispatcher } from 'svelte';

	export let count = 0;
	let tope = 100;

	const dispatch = createEventDispatcher();

	function handleClick(count: number) {
		dispatch('cambiado', { count });
	}
</script>

<div class="counter">
	<button
		type="button"
		on:click={() => {
			if (count >= 1) {
				count -= 1;
				handleClick(count);
			}
		}}
		aria-label="Disminiuir"
	>
		<Decrease />
	</button>
	<div>{count}</div>
	<button
		type="button"
		on:click={() => {
			if (count < tope) {
				count += 1;
				handleClick(count);
			}
		}}
		aria-label="Aumentar"
	>
		<Increase />
	</button>
</div>

<style lang="scss">
	@import './static/style.scss';

	.counter {
		display: flex;
		align-items: center;
		justify-content: end;
		gap: 10px;
		margin-bottom: 10px;

		&.counter button {
			padding: 0;
			display: flex;
			align-items: bottom;
			justify-content: center;
			background: none;
			border: none;
			padding: 0px;
			touch-action: manipulation;
		}
	}
</style>
