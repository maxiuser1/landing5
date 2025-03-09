<script lang="ts">
	import Soles from '$lib/shared/Soles.svelte';
	let { compra, idx } = $props();
	const add = () => compra.cantidad++;
	const substract = () => compra.cantidad--;
</script>

<div class="compra" class:compra--odd={idx % 2 == 0}>
	{compra.nombre}
	<div class="precio">
		<Soles number={compra.precio} />
		<div class="botonera">
			<button onclick={substract} disabled={compra.cantidad == 0} class="subs"><span class="min">-</span></button>
			<div>{compra.cantidad}</div>
			<button onclick={add}>+</button>
		</div>
	</div>
</div>

<style lang="scss">
	.compra {
		display: flex;
		justify-content: space-between;
		padding: 18px 32px;
		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}

	.precio {
		display: flex;
		gap: 24px;
	}

	.botonera {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
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
