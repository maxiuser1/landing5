<script lang="ts">
	import { Pin } from '$lib/icons';
	export let evento: App.Evento;
</script>

<div class="detalles">
	<div class="headings">
		<h4>Detalle</h4>
		<h2>{evento.general?.artista}</h2>
		<h5>{evento.general?.nombre}</h5>
	</div>

	<h6>
		{#each evento.fechas as fecha}
			{new Date(fecha.dia).toLocaleDateString()}
		{/each}
	</h6>
	<p>
		<Pin />
		{evento.ubicacion?.nombre}
	</p>

	<br />
	<div>
		{@html evento.caratula?.detalles}
	</div>

	<img src={evento.caratula?.thumb} alt="logo" />
</div>

<style lang="scss">
	.detalles {
		border-radius: 8px;
		background: white;
		padding: 24px !important;

		@include breakpoint($md) {
			width: 40%;
		}

		.headings {
			border-bottom: 1px solid #e2e2e2;
			margin-bottom: 16px;
		}

		p {
			margin-top: 8px;
			font-size: 14px;
		}

		img {
			width: 100%;
			height: auto;
		}
	}
</style>
