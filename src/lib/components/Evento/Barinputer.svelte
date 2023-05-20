<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { BarcodeReader, BarcodeScanner } from 'dynamsoft-javascript-barcode';

	const dispatch = createEventDispatcher();

	let bDestroyed = false;
	let pScanner: any = null;
	let elRef: any;
	let scanner: any;
	onMount(async () => {
		try {
			const scanner = await (pScanner = BarcodeScanner.createInstance());
			await scanner.setUIElement(elRef);
			scanner.onUniqueRead = (txt: any, result: any) => {
				alert(txt);
				dispatch('detected', { text: txt });
			};

			await scanner.updateRuntimeSettings('dense');
			await scanner.setResolution(3840, 2160);
			await scanner.open();
		} catch (error) {
			console.error(error);
		}
	});

	onDestroy(async () => {
		if (pScanner) {
			(await pScanner).destroyContext();
		}
	});

	async function stop() {
		await scanner.stop();
		dispatch('closed', { text: 'aa' });
	}
</script>

<button on:click={stop} type="button" class="btn">Volver</button>
<div bind:this={elRef} class="dce-video-container" />

<style>
	div {
		width: 100%;
		height: 100%;
		min-height: 480px;
		background: #eee;
		position: relative;
		resize: both;
	}
</style>
