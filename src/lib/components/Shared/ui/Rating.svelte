<script lang="ts">
	import { Star } from '$lib/icons';

	let estrellas = $state<Array<{ id: number; on: boolean }>>([
		{ id: 1, on: false },
		{ id: 2, on: false },
		{ id: 3, on: false },
		{ id: 4, on: false },
		{ id: 5, on: false }
	]);
	let currentStar = $state(0);
	let setted = $state(false);
	const onmouseenter = (val: number) => {
		currentStar = val;
		setted = false;
	};

	const onmouseleave = () => {
		if (!setted) currentStar = 0;
	};

	const onclick = (val: number) => {
		setted = true;
		currentStar = val;
	};
</script>

<div class="calificar mt-20">
	{#each estrellas as estrella}
		<button
			class="btn--icon star"
			onclick={() => onclick(estrella.id)}
			onmouseenter={() => onmouseenter(estrella.id)}
			onmouseleave={() => onmouseleave()}
			class:activo={estrella.id <= currentStar}
		>
			<Star />
		</button>
	{/each}
</div>

<style lang="scss">
	.calificar {
		display: flex;
		gap: 8px;
		fill: #fff;
		button {
			&:hover {
				fill: yellow;
				stroke: yellow;
				color: yellow;
			}
		}
	}

	button.activo {
		fill: yellow;
		stroke: yellow;
		color: yellow;
	}
</style>
