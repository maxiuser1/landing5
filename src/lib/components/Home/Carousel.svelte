<script lang="ts">
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';

	export let eventos: Array<App.Evento>;

	let cantidad = 0;
	let ancho = 0;
	let mini = 0;
	let translate = 0;
	let selectedidx = 0;

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

	onMount(async () => {
		cantidad = eventos.length;
		ancho = 100 * cantidad;
		mini = 100 / cantidad;
		translate = 0;
		selectedidx = 0;
	});

	const start = () => {
		let current = 0;
		return new Promise((resolve) => {
			setIntervalImmediate(() => {
				handleClick(current);
				current++;
				if (current == eventos.length) {
					current = 0;
				}
			}, 3000);
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
		{#each eventos as evento, idx}
			<div class="slide-container" style="width: {mini}%">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="slide" style="background-image: url('{evento.banner}'); background-position: center top;background-size: 100% 100%;">
					<div class="gradiente">
						<div class="titulos">
							<h2>{evento.nombre}</h2>
							<h5>{evento.artista}</h5>
							<h5>{evento.lugar}</h5>
							<button class="ver-mas" on:click={() => redirigir(evento.slug)}> Ver más </button>
						</div>
						<div class="bnav">
							<button type="button" class="previo" on:click={() => handlePrevClick(idx)}>
								<span aria-label="previo"> ‹ </span>
							</button>
							<button type="button" class="siguiente" on:click={() => handleNextClick(idx)}>
								<span aria-label="siguiente">›</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="botonera">
		<ul class="puntos">
			{#each eventos as item, idx}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<li class="punto" on:click={() => handleClick(idx)} class:selected={selectedidx === idx} />
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.titulos {
		position: absolute;
		z-index: 9;
		left: 10%;
		top: 50%;

		h5 {
			font-size: 16px;
		}

		h2,
		h4,
		h5,
		h6 {
			color: white;
		}
	}
	.ver-mas {
		background-color: transparent;
		font-size: 16px;
		font-weight: 600;
		line-height: 24px;
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

			@include breakpoint($sm) {
				min-height: 200px;
				max-height: 200px;
			}

			@include breakpoint($md) {
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
				z-index: 999;
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
				z-index: 999;
			}

			&::before {
				background-color: rgba(0, 0, 0, 0.55);
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 1;
			}
		}

		.botonera {
			padding-top: 20px;
			width: 100%;
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
			border-radius: 50%;
		}

		.selected {
			width: 12px;
			background: #d30ed1;
			border: 1px solid #ffffff;
			border-radius: 8px;
		}
	}
</style>
