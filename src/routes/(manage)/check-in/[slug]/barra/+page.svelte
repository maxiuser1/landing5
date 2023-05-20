<script lang="ts">
	import '../../../../../dbr';
	import { Barinputer } from '$lib/components/Evento';
	import { onMount } from 'svelte';
	import { BarcodeScanner } from 'dynamsoft-javascript-barcode';

	let scanning = false;
	let camara = false;

	onMount(async () => {
		try {
			await BarcodeScanner.loadWasm();
		} catch (ex) {
			console.error(ex);
		}
	});

	function scanCanceld(event: any) {
		camara = false;
	}

	function scanned(event: any) {
		console.log('event', event);
	}
</script>

<section class="container">
	<div class="modal">
		<Barinputer on:detected={scanned} on:closed={scanCanceld} />
	</div>
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
	<br />
</section>

<style lang="scss">
	@import './static/style.scss';
	.modal {
		width: 100%;
		height: 90vh;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		display: flex;
		align-items: center;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20px;
	}

	.modal {
		background: transparent;
		border: none;
		margin: 0 auto;
		margin-top: 24px;
	}

	.modal::backdrop {
		background: rgb(0 0 0 / 0.4);
	}
</style>
