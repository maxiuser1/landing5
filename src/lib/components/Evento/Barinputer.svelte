<script lang="ts">
	import { enhance } from '$app/forms';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;
	let camara = false;
	let html5Qrcode: any;
	export let value: string | null | undefined = null;
	export let name: string | null | undefined = null;
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
		if (scanning) {
			await html5Qrcode.stop();
			scanning = false;
		}
		camara = false;
	}

	async function onScanSuccess(decodedText, decodedResult) {
		value = decodedText;
		camara = false;
		await stop();
	}

	function onScanFailure(error) {}

	const showDialogClick = () => {
		camara = true;
	};
</script>

<div class="modal" style:visibility={camara ? 'visible' : 'hidden'}>
	<reader id="reader" />
	<div class="botones">
		<button on:click={start} type="button" class="btn">Escanear</button>
		<button on:click={stop} type="button" class="btn">Cancelar</button>
	</div>
</div>

<div>
	<input type="text" bind:value {name} on:change on:blur />
	<button on:click={() => showDialogClick()} type="button">S</button>
</div>

<style>
	.botones {
		display: flex;
		gap: 20px;
	}

	.modal {
		align-items: center;
		background: white;
		bottom: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
		height: 90vh;
		justify-content: center;
		left: 0;
		position: fixed;
		right: 0;
		top: 0;
		width: 100%;
		z-index: 9999;
	}

	#reader {
		width: 100%;
		min-height: 70vh;
		background-color: black;
	}
</style>
