<script lang="ts">
	import Cuadrado from '$lib/icons/Cuadrado.svelte';

	let { reserva, precio } = $props();
	let sitWidth = $state(24);
</script>

<div class="wrapper">
	<div class="asientos">
		{#each precio.filas as fila, i}
			{@const tagFila = fila.tag.split(':')[0]}
			{@const tagSits = fila.tag.split(':')[1].split(' ')}
			<ul class="fila">
				<li style:min-width="{sitWidth}px">{tagFila}</li>
				{#each fila.sits as sit, j}
					<li style:min-width="{sitWidth}px">
						{#if sit.s != 0}
							{@const tomado = reserva.compras.some(
								(t: App.ItemCompra) => t.codigo === `${precio.codigo}-${tagFila}-${tagSits[j]}`
							)}
							{#if tomado}
								<Cuadrado
									disabled={sit.s >= 2}
									numero={tagSits[j]}
									tomado={true}
									clicked={(e: boolean) => {
										if (e) {
											reserva.addSit(precio, fila, sit, tagFila, tagSits[j]);
										} else {
											reserva.delSit(precio, tagFila, tagSits[j]);
										}
									}}
								></Cuadrado>
							{:else}
								<Cuadrado
									disabled={sit.s >= 2}
									numero={tagSits[j]}
									tomado={false}
									clicked={(e: boolean) => {
										if (e) {
											reserva.addSit(precio, fila, sit, tagFila, tagSits[j]);
										} else {
											reserva.delSit(precio, tagFila, tagSits[j]);
										}
									}}
								></Cuadrado>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
	.wrapper {
		display: flex;
		justify-content: center;
	}

	.asientos {
		padding-top: 30px;
		overflow-x: auto;
		max-width: 300px;
		.fila {
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			gap: 4px;
			padding-bottom: 10px;
		}

		@include mixin.breakpoint(mixin.$md) {
			max-width: initial;
		}
	}
</style>
