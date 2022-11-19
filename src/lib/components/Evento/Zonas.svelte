<script type="ts">
	import { zonas } from './zonas';
	import { compraData } from './store';
	import { goto } from '$app/navigation';
	import { Radio } from '$lib/icons';
	import { Soles } from '$lib/utils/formats';
	import { page } from '$app/stores';

	export let evento: App.Evento;

	const seleccionar = (zonaSeleccionada: any) => {
		compraData.update((current) => ({
			...current,
			zona: {
				tipo: zonaSeleccionada.tipo,
				nombre: zonaSeleccionada.nombre,
				base: zonaSeleccionada.base,
				online: zonaSeleccionada.online,
				promotor: zonaSeleccionada.promotor,
				numerado: zonaSeleccionada.numerado,
				qrcode: zonaSeleccionada.qrcode
			}
		}));

		const esPromotor = $page.data.user.rol != undefined && $page.data.user.rol == 'promotor';

		if (zonaSeleccionada.numerado) {
			goto(`../${evento.general?.slug}/lugar${$page.url.search ?? ''}`);
		} else {
			esPromotor ? goto(`../${evento.general?.slug}/venta`) : goto(`../${evento.general?.slug}/reserva${$page.url.search ?? ''}`);
		}
	};
</script>

<div
	class="mapa"
	use:zonas={evento.precios}
	on:zonned={({ detail }) => {
		seleccionar(detail);
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
