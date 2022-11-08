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
	<ul>
		<li>* BOX GOLD: Venta de box completo, máximo 10 personas; incluye: 10 brazaletes, 01 Botella JW Gold Label +02 Red Bull, 02 Aguas y Hielo.</li>
		<li>* BOX BLACK: Ventas de box completo, máximo 10 personas; incluye: 10 brazaletes, 01 Botella JW Black Label + 02 Red Bull, 02 Aguas y Hielo.</li>
		<li>* SECTORES STAND UP: Vip y General; cada entrada incluye una (01) cerveza.</li>
	</ul>

	<img src="https://res.cloudinary.com/maxitech/image/upload/v1667607838/ticketera/banners/newlatin2_qzmcd9.png" alt="logo" />
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
