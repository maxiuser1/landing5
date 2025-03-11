<script lang="ts">
	let { texto } = $props();
	let copiado = $state(false);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(texto);
			copiado = true;
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}
</script>

<div class="input-group">
	<input type="text" value={texto} class="form-control" />
	<button type="button" class="btn--outline" onclick={copyToClipboard}>{copiado ? 'Copiado' : 'Copiar'}</button>
</div>

<style lang="scss">
	.input-group {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		width: 100%;

		& > .form-control {
			position: relative;
			flex: 1 1 auto;
			width: 1%;
			min-width: 0;
			max-width: 150px;
			border-top-right-radius: 0px !important;
			border-bottom-right-radius: 0px !important;
			border-top: 1px solid #d30ed1;
			border-bottom: 1px solid #d30ed1;
			border-left: 1px solid #d30ed1;
		}
		.btn--outline {
			border-top-left-radius: 0px !important;
			border-bottom-left-radius: 0px !important;
			border-left: none;
			line-height: initial;
			position: relative;
			z-index: 2;
		}

		input {
			min-width: 100%;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}
	}
</style>
