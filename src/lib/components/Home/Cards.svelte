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
	@import './static/style.scss';
	.cards {
		display: flex;
		flex-direction: column;
		gap: 15px;

		@include breakpoint($md) {
			display: grid;

			grid-template-columns: repeat(auto-fill, minmax(398px, 1fr));
			gap: 25px;
		}
	}
</style>
