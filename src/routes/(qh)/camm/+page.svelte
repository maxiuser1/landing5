<script lang="ts">
	import { enhance } from '$app/forms';
	import { Qrcode } from '$lib/icons';
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	let scanning = false;
	let camara = false;
	let html5Qrcode: any;
	let currentIndex = 0;
	onMount(init);

	let lista = [
		{
			id: 'demo1',
			valor: ''
		},
		{
			id: 'demo2',
			valor: ''
		}
	];

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
		camara = false;
	}

	function onScanSuccess(decodedText: any, decodedResult: any) {
		lista[currentIndex].valor = decodedText;
	}

	function onScanFailure(error: any) {
		console.warn(`Code scan error = ${error}`);
	}

	const showDialogClick = (indice: number) => {
		lista[indice].valor = '';
		currentIndex = indice;
		camara = true;
	};
</script>

<div class="modal" style:visibility={camara ? 'visible' : 'hidden'}>
	<reader id="reader" />
	{#if scanning}
		<button on:click={stop} type="button" class="btn"> {lista[currentIndex].valor ? 'Aceptar:' + lista[currentIndex].valor : 'Cancelar'}</button>
	{:else}
		<button on:click={start} type="button" class="btn">Escanear</button>
	{/if}
</div>

<section class="container">
	<div class="formulario">
		<h1>test</h1>
		<form
			method="POST"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ result, update }) => {
					console.log('resu', result);
					form.reset();
				};
			}}
		>
			{#each lista as item, indice}
				<div class="input-group">
					<input type="text" name={item.id} bind:value={item.valor} class="form-control" />
					<button on:click={() => showDialogClick(indice)} type="button" class="btn"><Qrcode /></button>
				</div>
			{/each}

			<button type="submit" class="btn"> Continuar </button>
		</form>
	</div>
</section>

<style>
	.input-group .btn {
		padding: 4px 4px !important;
		line-height: initial;
		position: relative;
		z-index: 2;
	}

	.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
		margin-left: -1px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	.input-group > .form-control {
		position: relative;
		flex: 1 1 auto;
		width: 1%;
		min-width: 0;
	}

	.form-control {
		display: block;
		width: 100%;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: #212529;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0.375rem;
	}
	.input-group {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		width: 100%;
	}

	.formulario {
		padding-top: 40px;
		margin-bottom: 80px;
	}

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

	#reader {
		width: 100%;
		min-height: 70vh;
		background-color: black;
	}
</style>
