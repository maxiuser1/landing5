<script lang="ts">
	import Carousel from '$lib/components/Home/Carousel.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<Carousel eventos={data.banners} />

<style lang="scss">
	@use '../../../static/style.scss' as mixin;
</style>
