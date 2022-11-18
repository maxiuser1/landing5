<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

	const dispatch = createEventDispatcher();
	let barcontainer: any;
	let scanner: any;
	onMount(async () => {
		BarcodeScanner.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNDY5NjA4LVRYbFhaV0pRY205cVgyUmljZyIsIm9yZ2FuaXphdGlvbklEIjoiMTAxNDY5NjA4IiwiY2hlY2tDb2RlIjotMTU5ODI4OTE0MX0=';
		scanner = await BarcodeScanner.createInstance();

		scanner.onUniqueRead = (txt: any, result: any) => {
			dispatch('detected', { text: txt });
		};
		await scanner.show();
	});

	onDestroy(() => {
		scanner.destroyContext();
	});

	async function stop() {
		await scanner.stop();
		dispatch('closed', { text: 'aa' });
	}
</script>

<button on:click={stop} type="button" class="btn">Cerrar</button>
<div bind:this={barcontainer} />
