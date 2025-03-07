<script lang="ts">
	import { Radio } from '$lib/icons';
	import { Soles } from '$lib/utils/formats';

	export let evento: App.Evento;
</script>

<section class="container">
	<div class="entradas">
		<h4>Entradas</h4>
		<div>
			<table>
				<thead>
					<tr>
						<th />
						<th />
						<th class="general">Precio</th>
						<th>Promoción</th>
					</tr>
				</thead>
				<tbody>
					{#if evento.precios}
						{#each evento.precios as precio, idx}
							<tr class:white={idx % 2 == 0}>
								<td class="radio">
									<div class="radio">
										<Radio color={precio.color ? precio.color : ''} />
									</div>
								</td>
								<td
									>{precio.nombre}
									{#if precio.tope}
										(box de {precio.tope} personas máximo)
									{/if}
								</td>
								<td><Soles number={precio.base} /></td>
								<td style="text-align: center;">
									{#if precio.promo}
										{precio.promo}
									{/if}
								</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</section>

<style lang="scss">
	@use './static/style.scss' as mixin;
	.entradas {
		table {
			border-spacing: 0px;
			width: 100%;

			// td {
			// 	border: 1px solid red;
			// }

			td.radio {
				width: 40px;
				div.radio {
					padding: 12px 16px;
				}
			}
			tr.white {
				background-color: white;
			}

			th.general {
				text-align: left;
			}
		}
	}
</style>
