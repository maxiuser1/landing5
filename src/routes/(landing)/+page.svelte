<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1 class="item">{data.eventos?.length}</h1>

<style lang="scss">
	@use '../../../static/style.scss' as mixin;

	.item {
		color: yellow;
		@include mixin.breakpoint(mixin.$md) {
			color: red;
		}
	}
</style>
