<script lang="ts">
	let { parrilla, caratula } = $props();
</script>

<img class="portada" src={caratula.mapa} alt="Portada" />
<br />
<div class="tabla">
	<table>
		<thead>
			<tr>
				<th class="nada"></th>
				{#each parrilla.titulos as titulo, idx}
					<th
						>{titulo.label}
						<span class="fecha-valido">Válido desde {titulo.desde} hasta {titulo.hasta}</span>
					</th>
				{/each}
				<th>Regular</th>
			</tr>
		</thead>
		<tbody>
			{#if parrilla.items}
				{#each parrilla.items as precio, idx}
					<tr>
						<td class="radio">
							<div class="radio">
								<!-- <Radio color={precio.color ? precio.color : ''} /> -->
								{precio.zona}
							</div>
						</td>
						{#each precio.items as item, idy}
							<td>
								{#if item.precio && item.precio > 0}
									{item.precio}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style lang="scss">
	.portada {
		width: 100%;
	}

	.tabla {
		margin-top: 35px;

		table {
			width: 100%;
			border-collapse: collapse;
			thead {
				th {
					text-align: center;
					border: 1px solid var(--theme-contraste);
					padding: 8px;
				}
				.nada {
					border: none;
				}
			}

			tbody {
				td {
					text-align: center;
					border: 1px solid var(--theme-contraste);
					padding: 8px;
				}
			}
		}
	}
</style>
