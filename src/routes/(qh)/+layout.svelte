<script lang="ts">
	import { Footer, Header } from '$lib/components/Layout';
	import { Whatsapp } from '$lib/icons';
	import { compraData } from '$lib/components/Evento/store';
	import Har from '$lib/components/Layout/Header/Har.svelte';
	export let data;

	let categories: Array<string> = ['Destacados', 'Conciertos', 'Teatro', 'Deportes', 'Festrivales', 'Arte y Cultura', 'Niños'];
</script>

<Har enEvento={data.enEvento} />
{#if !data.enEvento}
	<Header />
{/if}

<main>
	<slot />
</main>
<Footer enEvento={data.enEvento} />
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
