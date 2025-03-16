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
	.filas {
		display: flex;
		flex-direction: column;
		gap: 24px;

		.fila {
			background: #fff;
			padding: 24px;
			border-radius: 8px;
			align-items: center;
			display: flex;
			justify-content: space-between;
			&--activo {
				border: 1px solid #d30ed1;
			}

			img {
				width: 200px;
			}
		}
	}
</style>
