<script lang="ts">
	import { zonas } from './zonas';
	import { Radio } from '$lib/icons';
	import { Soles } from '$lib/utils/formats';
	import { createEventDispatcher } from 'svelte';

	export let evento: App.Evento;

	const dispatch = createEventDispatcher();
</script>

<div
	class="mapa"
	use:zonas={evento.precios}
	on:zonned={({ detail }) => {
		dispatch('seleccionar', { zona: detail.codigo });
	}}
>
	{@html evento.locacion}
</div>
<div class="leyenda">
	<div class="precios">
		{#if evento.precios}
			<table>
				<thead>
					<tr>
						<th />
						<th />
						<th class="tdprecio">Pre-venta</th>
						<th class="tdprecio">Normal</th>
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
								{#if precio.c && precio.disponibles && precio.c >= precio.disponibles}
									<td class="tdnombre agotado">{precio.nombre} {precio.disponibles} {precio.c} (Agotado) </td>
								{:else}
									<td class="tdnombre">{precio.nombre} </td>
								{/if}
								<td class="tdprecio"><Soles number={precio.online} /></td>
								<td class="tdprecio"><Soles number={precio.onlineNormal} /></td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		{/if}
	</div>
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;
	.leyenda {
		display: flex;
		justify-content: center;

		.precios {
			max-width: 400px;
		}
	}

	.tdnombre {
		min-width: 100px;
	}

	.agotado {
		text-decoration: line-through;
	}

	.tdprecio {
		min-width: 100px;
		text-align: right;
	}

	.mapa {
		width: 100%;
		display: flex;
		justify-content: center;
		@include mixin.breakpoint(mixin.$md) {
			margin: 20px 0px;
		}
	}
</style>
