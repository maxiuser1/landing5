<script lang="ts">
	import Card from './Card.svelte';

	export let eventos: Array<App.Evento>;
</script>

<div class="cards">
	{#each eventos as evento}
		<Card {evento} />
	{/each}
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(342px, 1fr));
		gap: 15px;

		@include mixin.breakpoint(mixin.$md) {
			grid-template-columns: repeat(auto-fill, minmax(398px, 1fr));
			gap: 25px;
		}
	}
</style>
