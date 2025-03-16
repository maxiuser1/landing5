<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import Modal from '../Shared/ui/Modal.svelte';
	import Retro from './Retro.svelte';
	let { eventos = [] }: { eventos: App.HomeEvento[] } = $props();
	let showModal = $state(false);
	const openDialog = (evento: App.HomeEvento) => {
		showModal = true;
	};

	const comprometer = (accion: string, valor: string) => {
		showModal = false;
	};
</script>

<div class="cards">
	{#each eventos as evento}
		<Card {evento} more={() => openDialog(evento)} />
	{/each}
</div>

<Modal bind:showModal>
	{#snippet header()}{/snippet}
	<Retro {comprometer} />
</Modal>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;

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
