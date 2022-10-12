<script lang="ts">
	import { Footer, Header } from '$lib/components/Layout';
	let categories: Array<string> = [
		'Destacados',
		'Conciertos',
		'Teatro',
		'Deportes',
		'Festrivales',
		'Arte y Cultura',
		'Niños'
	];
</script>

<svelte:head>
	<!-- Start of quehay Zendesk Widget script -->
	<script
		id="ze-snippet"
		src="https://static.zdassets.com/ekr/snippet.js?key=0b8464e9-9d32-4b3a-945a-02f19d295df7">
	</script>
	<!-- End of quehay Zendesk Widget script -->
</svelte:head>

<Header {categories} />
<main>
	<slot />
</main>
<Footer />

<style lang="scss">
</style>
