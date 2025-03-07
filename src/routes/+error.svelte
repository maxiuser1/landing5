<script lang="ts">
	import { Footer, Header } from '$lib/components/Layout';
	import { Whatsapp } from '$lib/icons';
	let categories: Array<string> = ['Destacados', 'Conciertos', 'Teatro', 'Deportes', 'Festrivales', 'Arte y Cultura', 'Niños'];
</script>

<Header {categories} />
<div class="container">
	<div class="prota">
		<div class="img">
			<img src="https://res.cloudinary.com/dlin4qysg/image/upload/v1669132239/ticketera/assets/error_ykasqr.png" alt="error" />
		</div>
		<h1>Ocurrió un error</h1>
		<p>Por el momento no hay servicio, vuelva mas tarde</p>
	</div>
</div>
<Footer />

<style lang="scss">
	.prota {
		text-align: center;
		margin-top: 100px;
		min-height: 60vh;

		.img {
			margin-bottom: 10px;
		}
	}
</style>
