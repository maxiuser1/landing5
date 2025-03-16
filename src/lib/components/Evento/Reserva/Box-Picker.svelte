<script lang="ts">
	import { Arrow, Box } from '$lib/icons';

	let { reserva, precio, confirmar } = $props();
	let sitWidth = $state(75);
</script>

<div class="wrapper">
	<div class="asientos">
		{#each precio.filas as fila, i}
			{@const tagFila = fila.tag.split(':')[0]}
			{@const tagSits = fila.tag.split(':')[1].split(' ')}
			<ul class="fila">
				<li style:min-width="20px">{tagFila}</li>
				{#each fila.sits as sit, j}
					<li style:min-width="{sitWidth}px">
						{#if sit.s != 0}
							{@const tomado = reserva.compras.some(
								(t: App.ItemCompra) => t.id === `${precio.codigo}-${tagFila}-${tagSits[j]}`
							)}
							{#if tomado}
								<Box
									numero={tagSits[j]}
									disabled={sit.s >= 2}
									width={sitWidth}
									tomados={sit.c ?? 0}
									limite={sit.l ?? 10}
									tomado={true}
									clicked={(e: boolean) => {
										if (e) {
											reserva.addBox(precio, fila, sit, tagFila, tagSits[j]);
										} else {
											reserva.delSit(precio, tagFila, tagSits[j]);
										}
									}}
								/>
							{:else}
								<Box
									numero={tagSits[j]}
									disabled={sit.s >= 2}
									width={sitWidth}
									tomados={sit.c ?? 0}
									tomado={false}
									limite={sit.l ?? 10}
									clicked={(e: boolean) => {
										if (e) {
											reserva.addBox(precio, fila, sit, tagFila, tagSits[j]);
										} else {
											reserva.delSit(precio, tagFila, tagSits[j]);
										}
									}}
								/>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>
<div class="wrapper">
	<button type="button" class="btn" onclick={confirmar}>Resumen <Arrow /></button>
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;
	.wrapper {
		display: flex;
		justify-content: center;
		button {
			margin-top: 24px;
		}
	}

	.asientos {
		padding-top: 30px;
		overflow-x: auto;
		max-width: 300px;

		@include mixin.breakpoint(mixin.$md) {
			max-width: 600px;
		}

		.fila {
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			gap: 4px;
			padding-bottom: 10px;
		}
	}
</style>
