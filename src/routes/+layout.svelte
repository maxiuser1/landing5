<script lang="ts">
	import { Header } from '$lib/components/Layout';
	let categories: Array<string> = [
		'Conciertos',
		'Teatro',
		'Deportes',
		'Festrivales',
		'Arte y Cultura',
		'Niños'
	];
</script>

<Header {categories} />

<slot />
