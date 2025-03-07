<script lang="ts">
	import { Decrease, Increase } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	import { cartItems, addToCart, removeFromCart } from './store';

	export let producto: App.Producto;
	let count = 0;
	let tope: number = 50;
	let total: number = 0;
	let precio: number = producto.precio;
	const dispatch = createEventDispatcher();

	function handleClick(count: number) {
		total = precio * count;
		addToCart(producto.id, count, total, producto.nombre);
	}
</script>

<div class="caja">
	<div class="imagen">
		<img src={producto.img} width="100px" alt="p" />
	</div>
	<div class="cuerpo">
		{producto.nombre}
		<div class="pie">
			<div class="counter">
				<button
					type="button"
					on:click={() => {
						if (count >= 1) {
							count -= 1;
							handleClick(count);
						}
					}}
					aria-label="Disminiuir"
				>
					<Decrease />
				</button>
				<div class="counter-viewport">
					<div class="counter-digits">
						{count}
					</div>
				</div>
				<button
					type="button"
					on:click={() => {
						if (count < tope) {
							count += 1;
							handleClick(count);
						}
					}}
					aria-label="Aumentar"
				>
					<Increase />
				</button>
			</div>
			<div class="precio">S/ {total}</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;

	.precio {
		font-weight: 900;
		font-size: 14px;
		line-height: 16px;
		color: #d30ed1;
	}
	.pie {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.counter {
		display: flex;
		align-items: center;
		justify-content: start;
		gap: 10px;
		font-size: 12px;
		margin-bottom: 10px;
		margin-top: 10px;

		&.counter button {
			padding: 0;
			display: flex;
			align-items: bottom;
			justify-content: center;
			background: none;
			border: none;
			padding: 0px;
			touch-action: manipulation;
		}
	}
	.cuerpo {
		background: #f9f9f9;
		padding: 12px;
	}
	.imagen {
		padding: 0.5rem;
		text-align: center;
	}
	.caja {
		border: 2px solid #e7e7e7;
		border-radius: 4px;
	}
</style>
