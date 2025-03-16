<script lang="ts">
	import type { PageProps } from './$types';
	import * as prismicH from '@prismicio/helpers';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/contenido.css" />
</svelte:head>

<section class="container prismic-content">
	{@html prismicH.asHTML(data.document.data.contenido)}
</section>

<style lang="scss">
	@use '$lib/scss/container';
</style>
