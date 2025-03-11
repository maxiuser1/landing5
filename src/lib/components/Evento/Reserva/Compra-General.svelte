<script lang="ts">
	let { cantidad, inc, dec, disabledAdd = false } = $props();
</script>

<div class="botonera">
	<button onclick={dec} disabled={cantidad == 0} class="subs"><span class="min">-</span></button>
	<div>{cantidad}</div>
	<button onclick={inc} disabled={disabledAdd}>+</button>
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
			width: 50px;
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
		}

		.subs {
			padding-bottom: 4px;
		}
		.min {
			transform: scale(2);
			color: black;
		}
	}
</style>
