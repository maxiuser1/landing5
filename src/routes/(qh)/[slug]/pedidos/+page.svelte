<script lang="ts">
	import { Breadcrumbs } from '$lib/components/Tienda';
	import type { PageData } from './$types';

	export let data: PageData;

	let { compras, evento } = data;
</script>

<Breadcrumbs {evento} />

<section class="container">
	<br />
	<br />
	<div class="principal">
		<div class="prota">
			<div class="titulos">
				<h4>Pedidos</h4>
			</div>
			<div>
				<table class="tpedidos">
					<thead>
						<tr>
							<th>N°</th>
							<th>Cliente</th>
							<th>Orden</th>
							<th>Ubicacion</th>
							<th>Monto</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each compras as compra}
							<tr>
								<td>
									{compra.pedido.compra ?? ''}
								</td>
								<td>
									{compra.pedido.info.invitado?.nombre ?? ''}
									{compra.pedido.info.invitado?.apellido ?? ''}
								</td>
								<td>
									{#each compra.pedido.info.productos as producto}
										<div>
											{producto.nombre} x{producto.cantidad}
										</div>
									{/each}
								</td>
								<td>
									{compra.pedido.info.ubicacion ?? ''}
								</td>
								<td>
									S/ {compra.pedido.info.total}
								</td>
								<td>
									<button class="btn">Cerrar</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.tpedidos {
		margin-top: 20px;
		th {
			border-bottom: 1px solid gray;
		}
		td {
			border-bottom: 1px solid rgb(195, 188, 188);
			padding: 10px;
		}
	}

	.btn-arrow {
		border: none;
		background: none;
	}
	.cta {
		width: 100%;
		text-align: center;
	}
	.formulario {
		background: #f8f8f8;
		padding: 20px 0px;
		margin-bottom: 20px;
	}

	.comprar {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 22px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
		border: none;
		font-size: 32px;
		color: white;
		width: 100%;
		min-width: 100%;
	}

	.productos {
		margin-top: 30px;
		display: grid;

		grid-template-columns: repeat(3, 1fr);

		grid-auto-rows: auto;

		grid-gap: 1rem;
	}
	.container {
		padding-right: initial;
		padding-left: initial;
	}

	.principal {
		display: flex;
		gap: 8px;
		margin-bottom: 80px;
		flex-direction: column;
		@include breakpoint($md) {
			flex-direction: row;
			gap: 24px;
		}
	}

	.prota {
		border-radius: 8px;
		background: white;
		.titulos {
			padding: 20px 20px 0px;
			@include breakpoint($md) {
				padding: initial;
			}
		}

		@include breakpoint($md) {
			width: 60%;
			padding: 24px 48px;
		}
	}
</style>
