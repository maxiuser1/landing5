<script lang="ts">
	import Dialog from '$lib/components/Shared/ui/Dialog/Dialog.svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;

	let html5Qrcode: any;
	let dialog: any;
	let valor: any;

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
		dialog.close();
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText, decodedResult) {
		valor = decodedText;
	}

	function onScanFailure(error) {
		console.warn(`Code scan error = ${error}`);
	}

	const showDialogClick = () => {
		dialog.showModal();
	};

	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<form method="POST">
	<input type="text" name="jose" bind:this={valor} />
	<button on:click={() => showDialogClick()}>Show dialog as modal</button>
</form>

<dialog bind:this={dialog} class="modal" id="modal">
	<main class="content-modal">
		<reader id="reader" />
		{#if scanning}
			<button on:click={stop} class="btn">Parar</button>
		{:else}
			<button on:click={start} class="btn">Scan</button>
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
