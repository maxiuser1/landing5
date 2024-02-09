<script lang="ts">
	import { Header } from '$lib/components/Layout';
	import { Whatsapp } from '$lib/icons';
	import HomeFooter from '$lib/components/Layout/Footer/Home-Footer.svelte';
	import HomeHeader from '$lib/components/Layout/Header/Home-Header.svelte';
	export let data;

	let categories: Array<string> = ['Destacados', 'Conciertos', 'Teatro', 'Deportes', 'Festrivales', 'Arte y Cultura', 'Niños'];
</script>

<HomeHeader />
<main>
	<slot />
</main>
<HomeFooter />

<a class="whatsapp-btn" rel="noreferrer" target="_blank" href="https://wa.me/51919293256">
	<Whatsapp />
</a>

<style lang="scss">
	@import './static/style.scss';
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
