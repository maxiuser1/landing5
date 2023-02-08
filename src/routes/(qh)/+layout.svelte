<script lang="ts">
	import { Footer, Header } from '$lib/components/Layout';
	import { Whatsapp } from '$lib/icons';
	import { compraData } from '$lib/components/Evento/store';

	let categories: Array<string> = ['Destacados', 'Conciertos', 'Teatro', 'Deportes', 'Festrivales', 'Arte y Cultura', 'Niños'];
</script>

<Header />
<main>
	<slot />
</main>
<Footer />
<a class="whatsapp-btn" rel="noreferrer" target="_blank" href="https://wa.me/51966058176">
	<Whatsapp />
</a>

<style lang="scss">
	@import './static/style.scss';
	@import './static/style.scss';

	.whatsapp-btn {
		position: fixed;
		right: 0;
		top: 92% !important;
		display: block;
		padding: 10px 20px;
		font-size: 12px;
		z-index: 99;
	}
</style>
