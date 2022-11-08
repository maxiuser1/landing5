<script lang="ts">
	import { onMount } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	export let value: string | null | undefined = null;
	export let name: string | null | undefined = null;

	let html5Qrcode: any;

	let scanning = false;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}

	let dialog: any;

	function start() {
		console.log('start');
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 380, height: 380 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		console.log('stop');
		dialog.close();
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText, decodedResult) {
		value = decodedText;
	}

	function onScanFailure(error) {
		console.warn(`Code scan error = ${error}`);
	}

	const showDialogClick = () => {
		dialog.showModal();
	};
</script>

<input type="text" bind:value {name} on:change on:blur />
<button on:click={() => showDialogClick()} type="button">Show dialog as modal</button>

<dialog bind:this={dialog} class="modal" id="modal">
	<main class="content-modal">
		<reader id="reader" />
		{#if scanning}
			<button on:click={stop} class="btn" type="button">Parar</button>
		{:else}
			<button on:click={start} class="btn" type="button">Scan</button>
		{/if}
	</main>
</dialog>

<style lang="scss">
	.modal {
		min-width: 100%;
		background: white;
		border: none;
		margin: 0 auto;
		margin-top: 24px;

		input {
			min-width: 250px;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}

		.form-group {
			margin-bottom: 32px;
		}

		.btn {
			width: 100%;
			font-weight: 600;
			font-size: 16px;
			line-height: 24px;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	reader {
		width: 100%;
		min-height: 70vh;
		background-color: black;
	}
</style>
