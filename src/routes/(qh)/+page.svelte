<script lang="ts">
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import Searchbox from '$lib/components/Home/Searchbox.svelte';
	import Sections from '$lib/components/Home/Sections.svelte';

	export let data;
	let { eventos } = data;
</script>

<Carousel {eventos} />
<Searchbox />
<Sections {eventos} />
b

<style lang="scss">
</style>
