<script lang="ts">
	import { Radio } from '$lib/icons';
	import Soles from '$lib/shared/Soles.svelte';

	let { evento } = $props();
</script>

<h4>Entrada</h4>
<p>Selecciona sus entradas:</p>
<div class="mapa">
	<img src={evento.caratula.mapa} alt="mapa" />
</div>

<div class="leyenda">
	<div class="precios">
		{#if evento.precios}
			<table>
				<tbody>
					{#if evento.precios}
						{#each evento.precios as precio, idx}
							<tr class:white={idx % 2 == 0}>
								<td class="radio">
									<div class="radio">
										<Radio color={precio.color ? precio.color : ''} />
									</div>
								</td>
								{#if precio.c && precio.disponibles && precio.c >= precio.disponibles}
									<td class="tdnombre agotado"
										>{precio.nombre} {precio.disponibles} {precio.c} (Agotado)
									</td>
								{:else}
									<td class="tdnombre">{precio.nombre} </td>
								{/if}
								<td class="tdprecio"><Soles number={precio.online} /></td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		{/if}
	</div>
</div>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.leyenda {
		display: flex;
		justify-content: center;

		.precios {
			tr.white {
				background-color: white;
				border-radius: 8px;
			}

			td {
				padding: 11px 32px;
			}
		}
	}

	.radio {
		padding-right: 10px;
	}

	.agotado {
		text-decoration: line-through;
	}

	.tdprecio {
		text-align: right;
	}

	.mapa {
		display: flex;
		justify-content: center;
		img {
			max-width: 250px;
			display: none;
		}
	}
</style>
