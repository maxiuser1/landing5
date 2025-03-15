<script lang="ts">
	let { cantidad, inc, dec, disabledInc = false, disabledDec = false } = $props();
</script>

<div class="botonera">
	<button onclick={dec} disabled={cantidad == 0 || disabledDec}>-</button>
	<div>{cantidad}</div>
	<button onclick={inc} disabled={disabledInc}>+</button>
</div>

<style lang="scss">
	.botonera {
		display: flex;
		align-items: center;

		justify-content: flex-end;
		div {
			font-size: 18px;
			line-height: 16px;
			font-weight: 425;
			width: 40px;
			text-align: center;
		}
		button {
			width: 24px;
			height: 24px;
			display: flex;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 3px solid black;
			background: none;
			font-size: 20px;
			text-align: center;
			cursor: pointer;
			&:disabled {
				border-color: rgb(211, 211, 211);
			}
		}
	}
</style>
