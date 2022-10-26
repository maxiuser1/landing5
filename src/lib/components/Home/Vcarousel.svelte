<script lang="ts">
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';

	let cantidad = 0;
	let ancho = 0;
	let mini = 0;
	let translate = 0;
	let selectedidx = 0;

	const handleClick = (idx: number) => {
		selectedidx = idx;
		translate = idx * (mini * -1);
	};

	onMount(async () => {
		cantidad = 3;
		ancho = 100 * cantidad;
		mini = 100 / cantidad;
		translate = 0;
		selectedidx = 0;
		start();
	});

	const start = () => {
		let current = 0;
		return new Promise((resolve) => {
			setIntervalImmediate(() => {
				handleClick(current);
				current++;
				if (current == 3) {
					current = 0;
				}
			}, 10000);
		});
	};

	const setIntervalImmediate = (fn: Function, ms: number) => {
		fn();
		return setInterval(fn, ms);
	};

	const redirigir = (slug: string) => {
		goto(`/${slug}`);
	};
</script>

<section class="carousel" aria-label="carousel">
	<div class="grande" style:width="{ancho}%" style:transform="translateX({translate}%)">
		<div class="slide">
			<div style="width: {mini}%">
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/hviKUJzcxLA"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		</div>
		<div class="slide">
			<div style="width: {mini}%">
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/hviKUJzcxLA"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		</div>
		<div class="slide">
			<div style="width: {mini}%">
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/hviKUJzcxLA"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>
		</div>
	</div>
	<div class="botonera">
		<ul class="puntos">
			<li class="punto" on:click={() => handleClick(0)} class:selected={selectedidx === 0} />
			<li class="punto" on:click={() => handleClick(1)} class:selected={selectedidx === 1} />
			<li class="punto" on:click={() => handleClick(2)} class:selected={selectedidx === 2} />
		</ul>
	</div>
</section>

<style lang="scss">
	.carousel {
		z-index: 3;
		width: 100%;
		overflow: hidden;
		position: relative;

		.grande {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			transition: all 0.5s ease;
		}

		.slide {
			color: yellow;
			cursor: pointer;
			font-size: 20px;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center center;
			height: 315px;
		}

		.botonera {
			width: 100%;
			position: absolute;
			bottom: 0px;
			display: none;
			@include breakpoint($md) {
				display: flex;
				justify-content: center;
			}
		}

		.puntos {
			display: flex;
			gap: 8px;
			flex-flow: row nowrap;
		}

		.punto {
			width: 12px;
			cursor: pointer;
			height: 12px;
			background-color: white;
			border: 1px solid #a809a6;
			margin-bottom: 52px;
			border-radius: 50%;
		}

		.selected {
			width: 32px;
			background: #d30ed1;
			border: 1px solid #ffffff;
			border-radius: 8px;
		}

		.slide-content {
			background-color: red;
			width: 560px;
			height: 315px;
			text-align: center;
		}
	}
</style>
