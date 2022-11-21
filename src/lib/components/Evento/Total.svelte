<script lang="ts">
	import { Ticket } from '$lib/icons';
	import Arrow from '$lib/icons/Arrow.svelte';

	export let cantidad: number = 0;
	export let monto: number = 0;
	export let volver: boolean = false;
</script>

<div class="compra totales">
	<div class="asiento">
		<div>
			{#if volver}
				<svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.9999 13.667L8.1749 12.492L3.5249 7.83366L13.6666 7.83366L13.6666 6.16699L3.5249 6.16699L8.1749 1.50866L6.9999 0.333658L0.333232 7.00032L6.9999 13.667Z" fill="#ff0036" />
				</svg>
			{:else}
				<Ticket />
			{/if}
		</div>
		<div class="etiquetas">
			<h2>
				Total: {cantidad}
			</h2>
		</div>
	</div>
	<div>
		<h4>
			<strong>
				S/ {monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			</strong>
		</h4>
	</div>
</div>

<style lang="scss">
	.compra {
		min-width: 300px;
		padding: 32px;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;

		@include breakpoint($sm) {
			min-width: 400px;
		}

		@include breakpoint($md) {
			min-width: 500px;
		}
	}
	.totales {
		border-radius: 0px;
		background-color: #dbdbdb;

		@include breakpoint($md) {
			border-top-left-radius: 0px;
			border-top-right-radius: 0px;
		}
	}

	.asiento {
		display: flex;
		align-items: center;
		gap: 10px;

		.etiquetas {
			padding-left: 24px;
		}
	}
</style>
