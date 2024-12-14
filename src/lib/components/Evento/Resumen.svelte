<script lang="ts">
	import { Fecha, Pin } from '$lib/icons';
	export let evento: App.Evento;
</script>

<div style="display:flex;flex-direction: column;">
	<div class="banner">
		<img class="img" src={evento?.caratula?.card} alt="banner" />
	</div>
	<div class="info">
		<h4 class="titulo--suprayado">{evento.general?.artista}</h4>
		<h6 class="h7">
			{evento.general?.nombre}
		</h6>

		<div class="date-info">
			<Pin />
			<h6 class="h7">
				{evento.ubicacion?.nombre}
			</h6>
		</div>
		<!-- si el evento slug es mistica presentar un div -->
		{#if evento.general?.slug === 'mistica'}
			<br />

			<Fecha /> 31-12-2024
			<br />
			<br />

			<p>
				🎊 ¡La Fiesta Mística de Año Nuevo 2025 en la Explanada de la playa Agua Dulce te espera! 🏖 🎉Ven a la mejor fiesta de lima y pasa el año nuevo frente al mar, con el mejor show en vivo, especial de fuegos artificiales, cábalas y juegos,
				sorteos y premios, activaciones por zonas con nuestros personajes místicos, polizonteando con los animadores 🎉 Artistas: ✨Pamela Franco ✨Bareto ✨Grupo Rio ✨Brenda Carvalho y su show de Full Axe con Exporto Brasil Animadores: ✨Carloncho
				✨Joselito Carrera 🔊 Preventa exclusiva del 25% de desucento en zonas General y VIP, y 10% en zona BOX (stock limitado), hasta el 20/12/2024 🔊 💰Venta de entradas: https://www.quehay.pe/mistica #AñoNuevo2025 #FiestaMística #Lima #Chorrillos
				#PlayaAguaDulce #FiestaEnLaPlaya #FiestaAñoNuevo
			</p>
		{/if}
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
		max-width: 300px;
	}

	.banner {
		img {
			width: 304px;
		}
	}
</style>
