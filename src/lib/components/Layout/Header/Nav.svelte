<script lang="ts">
	import { Close, Menu, User } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { dataset_dev } from 'svelte/internal';
	import { user } from '$lib/stores/userstore';
	export let closable = false;
	const dispatch = createEventDispatcher();
	const toggleMenu = () => dispatch('togglemenu');
</script>

<ul class="socials">
	<li class="item">
		{#if $page.data.user}
			<div>hola {$page.data.user.nombre}</div>
		{:else}
			<a class="ingresa" href="../login">
				<User />
				Ingresa
			</a>
		{/if}
	</li>
	<li class="last" on:click={toggleMenu}>
		{#if closable}
			<Close />
		{:else}
			<Menu lefted={false} />
		{/if}
	</li>
</ul>

<style lang="scss">
	.ingresa {
		color: white;
		display: flex;
		align-items: center;
	}
	.socials {
		display: flex;
		align-items: center;
		gap: 24px;
		color: white;
	}

	.item {
		display: none;
		@include breakpoint($md) {
			display: flex;
			align-items: center;
		}
	}

	.last {
		display: none;

		@include breakpoint($md) {
			display: initial;
			cursor: pointer;
			border-left: 2px solid #ff888f;
			padding-left: 24px;
		}
	}
</style>
