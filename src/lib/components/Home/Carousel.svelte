<script lang="ts">
	import { onMount } from 'svelte';

	let { eventos = [] }: { eventos: App.HomeEvento[] } = $props();
	let cantidad = $state(0);
	let ancho = $state(0);
	let mini = $state(0);
	let translate = $state(0);
	let selectedidx = $state(0);

	onMount(() => {
		cantidad = eventos.length;
		ancho = 100 * cantidad;
		mini = 100 / cantidad;
		translate = 0;
		selectedidx = 0;
	});

	const handleClick = (idx: number) => {
		selectedidx = idx;
		translate = idx * (mini * -1);
	};

	const handlePrevClick = (idx: number) => {
		if (idx == 0) {
			selectedidx = eventos.length - 1;
			translate = selectedidx * (mini * -1);
		} else {
			selectedidx = selectedidx - 1;
			translate = selectedidx * (mini * -1);
		}
	};

	const handleNextClick = (idx: number) => {
		if (idx == eventos.length - 1) {
			selectedidx = 0;
			translate = selectedidx * (mini * -1);
		} else {
			selectedidx = selectedidx + 1;
			translate = selectedidx * (mini * -1);
		}
	};

	const redirigir = (slug: string) => {};
</script>

<section class="carousel" aria-label="carousel">
	<div class="grande" style:width="{ancho}%" style:transform="translateX({translate}%)">
		{#each eventos as evento, idx}
			<div class="slide-container" style="width: {mini}%">
				<div
					class="slide"
					style="background-image: url('{evento.banner}'); background-position: center top;background-size: 100% 100%;"
				>
					<div class="gradiente">
						<button onclick={() => redirigir(evento.slug)} class="ver-mas"> Ver más </button>

						<div class="bnav">
							<button type="button" class="previo" onclick={() => handlePrevClick(idx)}>
								<span aria-label="previo"> ‹ </span>
							</button>
							<button type="button" class="siguiente" onclick={() => handleNextClick(idx)}>
								<span aria-label="siguiente">›</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="botonera">
		<ul class="puntos" role="menu">
			{#each eventos as item, idx}
				<li class="punto" role="none" class:selected={selectedidx === idx}>
					<button role="menuitem" type="button" onclick={() => handleClick(idx)} aria-label="siguiente"></button>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	@use '../../../../static/style.scss' as mixin;
	.ver-mas {
		position: absolute;
		top: 50%;
		background-color: transparent;
		font-size: 16px;
		font-weight: 600;
		line-height: 24px;
		left: 10%;
		border: 1px solid #fff;
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;

		&:hover {
			background-color: #fff;
			color: #1f0045;
		}
	}

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
			background-color: #1f0045;
			position: relative;
			background-repeat: no-repeat;
			min-height: 109px;
			max-height: 109px;

			@include mixin.breakpoint(mixin.$sm) {
				min-height: 200px;
				max-height: 200px;
			}

			@include mixin.breakpoint(mixin.$md) {
				min-height: 22.5rem;
				max-height: 22.5rem;
			}
		}

		.gradiente {
			position: absolute;
			width: 100%;
			top: 0;
			height: 100%;
			left: 0;

			.bnav {
				position: absolute;
				top: 50%;
				height: 3rem;
				margin-top: -30px;
				width: 100%;
			}

			.previo {
				width: 3rem;
				height: 3rem;
				background-color: rgba(211, 14, 209, 0.24);
				color: white;
				font-size: 2.5rem;
				border: none;
				left: 0;
				margin-left: 20px;
				position: absolute;
				cursor: pointer;
			}

			.siguiente {
				width: 3rem;
				height: 3rem;
				background-color: rgba(211, 14, 209, 0.24);
				color: white;
				font-size: 2.5rem;
				border: none;
				right: 0;
				margin-right: 20px;
				position: absolute;
				cursor: pointer;
			}
		}

		.botonera {
			padding-top: 20px;
			width: 100%;
			display: none;
			@include mixin.breakpoint(mixin.$md) {
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
			border-radius: 50%;

			button {
				width: 100%;
				height: 100%;
				background: transparent;
				border: none;
				cursor: pointer;
			}
		}

		.selected {
			width: 12px;
			background: #d30ed1;
			border: 1px solid #ffffff;
			border-radius: 8px;
		}
	}
</style>
