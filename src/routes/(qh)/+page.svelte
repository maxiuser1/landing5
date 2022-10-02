<script lang="ts">
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import Searchbox from '$lib/components/Home/Searchbox.svelte';
	import Sections from '$lib/components/Home/Sections.svelte';
	import { type ISourceOptions, tsParticles } from 'tsparticles-engine';
	import { loadFull } from 'tsparticles';
	import { onMount } from 'svelte';

	export let data;
	let { eventos } = data;

	let particlesConfig: ISourceOptions = {
		particles: {
			number: {
				value: 87,
				density: {
					enable: true,
					value_area: 721.5354273894853
				}
			},
			color: {
				value: '#da02e8'
			},
			shape: {
				type: 'star',
				stroke: {
					width: 0,
					color: '#000000'
				},
				polygon: {
					nb_sides: 9
				},
				image: {
					src: 'img/github.svg',
					width: 100,
					height: 100
				}
			},
			opacity: {
				value: 1,
				random: true,
				anim: {
					enable: true,
					speed: 1,
					opacity_min: 0,
					sync: false
				}
			},
			size: {
				value: 3,
				random: true,
				anim: {
					enable: false,
					speed: 4,
					size_min: 0.3,
					sync: false
				}
			},
			line_linked: {
				enable: false,
				distance: 150,
				color: '#e8046f',
				opacity: 0.4,
				width: 1
			},
			move: {
				enable: true,
				speed: 1,
				direction: 'none',
				random: true,
				straight: false,
				out_mode: 'out',
				bounce: false,
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 600
				}
			}
		},
		interactivity: {
			detect_on: 'canvas',
			events: {
				onhover: {
					enable: true,
					mode: 'grab'
				},
				onclick: {
					enable: true,
					mode: 'repulse'
				},
				resize: true
			},
			modes: {
				grab: {
					distance: 400,
					line_linked: {
						opacity: 1
					}
				},
				bubble: {
					distance: 250,
					size: 0,
					duration: 2,
					opacity: 0,
					speed: 3
				},
				repulse: {
					distance: 400,
					duration: 0.4
				},
				push: {
					particles_nb: 4
				},
				remove: {
					particles_nb: 2
				}
			}
		},
		retina_detect: true
	};

	onMount(async () => {
		await loadFull(tsParticles);
		await tsParticles.load('tsparticles', particlesConfig);
	});
</script>

<div id="tsparticles" />
<Carousel {eventos} />
<Searchbox />
<Sections {eventos} />

<style lang="scss">
	#tsparticles {
		opacity: 1;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 0;
	}
</style>
