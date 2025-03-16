<script lang="ts">
	import Autenticable from './Autenticable.svelte';
</script>

<header class="header">
	<nav class="container">
		<div></div>
		<Autenticable />
	</nav>
</header>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;
	@use '$lib/scss/container';

	.header {
		width: 100%;
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		background: var(--black);

		display: none;

		@include mixin.breakpoint(mixin.$md) {
			display: initial;
		}

		nav {
			margin: 0 auto;
			height: var(--header-height);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
