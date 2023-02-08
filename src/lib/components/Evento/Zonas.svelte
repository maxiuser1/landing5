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
		dispatch('seleccionar', { zona: detail.tipo });
	}}
>
	{@html evento.locacion}
</div>
<div class="leyenda">
	<div>
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
								<td class="tdnombre">{precio.nombre} </td>
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
	@import './static/style.scss';
	.leyenda {
		padding: 20px 20px 0px;
	}

	.tdnombre {
		min-width: 100px;
	}

	.tdprecio {
		min-width: 100px;
		text-align: right;
	}

	.mapa {
		width: 100%;
		@include breakpoint($md) {
			margin: 20px 0px;
		}
	}
</style>
