<script>
	import { page } from '$app/stores';
	console.log('page', $page);
</script>

<div class="container">
	<div class="prota">
		<div class="img">
			<img src="https://res.cloudinary.com/dlin4qysg/image/upload/v1669132239/ticketera/assets/error_ykasqr.png" alt="error" />
		</div>
		{#if $page.status == 404}
			<h1>Evento no encontrado o caducado</h1>
		{:else}
			<h1>Ocurrió un error</h1>
			<p>Por el momento no hay servicio, vuelva mas tarde</p>
		{/if}
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';
	.prota {
		text-align: center;
		margin-top: 100px;
		min-height: 60vh;

		.img {
			margin-bottom: 10px;
		}
	}
</style>
