<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container">
	<div class="seccion">
		<h3>Picado de tickets</h3>
		<div class="botones">
			<a href="/check-in/{data.slug}/scanear" class="btn">Scanear QR</a>
			<a href="/check-in/{data.slug}/barra" class="btn">Scanear Código de barra</a>
			<a href="/check-in/{data.slug}/manual" class="btn">Manual</a>
		</div>
	</div>
</section>

<style lang="scss">
	@use './static/style.scss' as mixin;

	.seccion {
		margin-top: 100px;
	}

	.botones {
		a {
			display: block;
			min-width: 200px;
			min-height: 40px;
			margin-bottom: 20px;
		}
	}
</style>
