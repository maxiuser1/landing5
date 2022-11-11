<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Quagga from '@ericblade/quagga2';
	const dispatch = createEventDispatcher();

	onMount(async () => {
		console.log('BAR ONOMUNT');
		Quagga.init(
			{
				frequency: 5,
				numOfWorkers: 2,
				locate: true,
				inputStream: {
					name: 'Live',
					type: 'LiveStream',
					target: '.overlay__content',
					constraints: {
						width: 800,
						height: 600,
						deviceId: 0,
						facingMode: 'environment'
					},
					area: {
						top: '0%',
						right: '0%',
						left: '0%',
						bottom: '0%'
					}
				},
				decoder: {
					readers: ['code_39_reader']
				},
				locator: {
					halfSample: true,
					patchSize: 'medium'
				}
			},
			function (err) {
				if (err) {
					console.log(err);
					return;
				}
				Quagga.start();
			}
		);
	});

	Quagga.onDetected(errorCheck);

	function errorCheck(result: any) {
		dispatch('detected', result);
		// alert(JSON.stringify(result));
		// const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
		// if (err < 0.25) {
		// 	const code = result?.codeResult?.code;
		// 	dispatch('detected', code);
		// }
	}

	function getMedianOfCodeErrors(decodedCodes: any) {
		const errors = decodedCodes.filter((x: any) => x.error !== undefined).map((x) => x.error);
		const medianOfErrors = getMedian(errors);
		return medianOfErrors;
	}

	function getMedian(arr: any) {
		arr.sort((a: any, b: any) => a - b);
		const half = Math.floor(arr.length / 2);
		if (arr.length % 2 === 1) {
			return arr[half];
		}
		return (arr[half - 1] + arr[half]) / 2;
	}

	onDestroy(() => {
		Quagga.stop();
	});

	function stop() {
		Quagga.stop();
		dispatch('closed');
	}
</script>

<button on:click={stop} type="button" class="btn">Cerrar</button>
<div class="overlay__content" />

<style>
	.overlay__content {
		width: 100%;
		min-height: 350px;
		background-color: black;
	}
</style>
