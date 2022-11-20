<script lang="ts">
	import { Footer, Header } from '$lib/components/Layout';
	import { compraData } from '$lib/components/Evento/store';
	let categories: Array<string> = ['Destacados', 'Conciertos', 'Teatro', 'Deportes', 'Festrivales', 'Arte y Cultura', 'Niños'];
</script>

<Header {categories} />
<main>
	<h1 style="color:pink">{JSON.stringify($compraData)}</h1>
	<slot />
</main>
<Footer />

<style lang="scss">
</style>
