<script lang="ts">
	import Carousel from '$lib/components/Home/Carousel.svelte';

	export let data;
	let { eventos } = data;
</script>

<Carousel {eventos} />
<div class="divider" />

<style lang="scss">
	.divider {
		display: none;
	}
</style>
