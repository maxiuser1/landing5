<script lang="ts">
	import { soles } from '$lib/shared/formatos';

	let { data } = $props();
	let { entradas } = data;
</script>

<div class="minicontainer mt-90">
	<h3 class="titulo--suprayado">Mis entradas</h3>

	<div class="filas">
		{#each entradas as entrada}
			<div class="fila">
				<div class="">
					<img src={entrada.card} alt={entrada.slug} />
				</div>
				<div class="">
					{#each entrada.compras.filter((t) => t.tipo == 'entrada') as compra}
						<div>
							x{compra.cantidad}
							{compra.codigo}: {soles(compra.total)}
						</div>
					{/each}
				</div>
				<div class="">
					<a class="btn" href="/entrada/{entrada.id}">Ver</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;
	.filas {
		margin-top:24px;
		display: flex;
		flex-direction: column;
		gap: 24px;

		.fila {
			background: #fff;
			padding: 24px;
			border-radius: 8px;
			align-items: center;
			display: flex;
		    flex-direction: column;
			gap: 16px;
			border: 1px solid #848282;

			@include mixin.breakpoint(mixin.$md) {
				justify-content: space-between;
				flex-direction: row;
			}

			img {
				width:100%;
				@include mixin.breakpoint(mixin.$md) {
					width: 200px;
				}
			}
		}
	}
</style>
