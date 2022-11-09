<script lang="ts">
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount, setContext } from 'svelte';

	let scanning = false;
	let camara = false;
	let html5Qrcode: any;
	let valor = '';
	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText, decodedResult) {
		setContext('heropy', decodedText);
		window.close();
	}

	function onScanFailure(error) {
		console.warn(`Code scan error = ${error}`);
	}

	const showDialogClick = () => {
		camara = true;
	};
</script>

<main>
	<reader id="reader" />
	{#if scanning}
		<button on:click={stop} type="button" class="btn">stop</button>
	{:else}
		<button on:click={start} type="button" class="btn">start</button>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	#reader {
		width: 100%;
		height: 70vh;
		background-color: black;
	}
</style>
