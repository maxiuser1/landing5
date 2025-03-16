<script lang="ts">
	import { Close, Hamburger } from '$lib/icons';

	let { closable = false, toggleMenu } = $props();
</script>

<button onclick={toggleMenu}>
	{#if closable}
		<Close color="black" />
	{:else}
		<Hamburger />
	{/if}
</button>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;

	button {
		border: none;
		background-color: transparent;
	}
</style>
