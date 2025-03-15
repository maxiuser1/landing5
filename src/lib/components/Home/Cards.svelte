<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	let { eventos = [] }: { eventos: App.HomeEvento[] } = $props();

	let showDialog = $state(false);
	let dialogRef = $state<HTMLDialogElement>();
	const openDialog = (evento: App.HomeEvento) => {
		console.log('lee', evento);
		if (dialogRef) {
			dialogRef.showModal();
			showDialog = true;
		}
	};

	onMount(() => {
		if (dialogRef) dialogRef.showModal();
	});

	const closeDialog = () => {
		if (dialogRef) dialogRef.close();
		showDialog = false;
	};
</script>

<div class="cards">
	{#each eventos as evento}
		<Card {evento} more={() => openDialog(evento)} />
	{/each}
</div>

<dialog oncancel={closeDialog} bind:this={dialogRef}>
	<div class="dialog">
		<h1>Dialog 2</h1>
		<button>Close</button>
	</div>
</dialog>

<style lang="scss">
	@use '../../../../static/style.scss' as mixin;

	dialog {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		border: none;
	}

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
