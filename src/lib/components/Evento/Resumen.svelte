<script lang="ts">
	import { Fecha, Pin } from '$lib/icons';
	import { compraData } from '$lib/components/Evento/esto.js';

	export let evento: App.Evento;
	let laFecha: string | undefined = $compraData?.evento?.fecha ? new Date($compraData.evento.fecha).toLocaleDateString() : undefined;
	let laHora: string | undefined = $compraData?.evento?.hora ? $compraData.evento.hora : undefined;
</script>

<div class="banner">
	<img class="img" src={evento?.caratula?.card} alt="banner" />
</div>
<div class="info">
	<h4 class="titulo--suprayado">{evento.general?.artista}</h4>
	<h6 class="h7">
		{evento.general?.nombre}
	</h6>

	<div class="date-info">
		<Fecha />
		<h6 class="h7 fechas">{laFecha} {laHora ? laHora : ''}</h6>
	</div>

	<div class="date-info">
		<Pin />
		<h6 class="h7">
			{evento.ubicacion?.nombre}
		</h6>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';

	.date-info {
		color: #3b3b3b;
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 10px;
	}
	.fechas {
		margin-top: 8px;
	}
	.info {
		margin-top: 28px;
	}

	.banner {
		img {
			width: 304px;
		}
	}
</style>
