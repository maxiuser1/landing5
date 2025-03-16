<script lang="ts">
	let { banner } = $props();
</script>

<section class="banner">
	<div
		class="slide"
		style="background-image: url('{banner}'); background-position: center top;background-size: 100% 100%;"
	></div>
</section>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;

	.slide {
		background-color: #1f0045;
		position: relative;
		background-repeat: no-repeat;
		min-height: 109px;
		max-height: 109px;

		@include mixin.breakpoint(mixin.$sm) {
			min-height: 200px;
			max-height: 200px;
		}

		@include mixin.breakpoint(mixin.$md) {
			min-height: 22.5rem;
			max-height: 22.5rem;
		}
	}

	.banner {
		@include mixin.breakpoint(mixin.$md) {
			height: 420px;
		}
	}
</style>
