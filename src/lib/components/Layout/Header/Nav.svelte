<script lang="ts">
	import { Close, Menu, User } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import { dataset_dev } from 'svelte/internal';
	import { user } from '$lib/stores/userstore';
	import type { TooltipConifg } from '$lib/components/Shared/ui/Tooltip/types';
	import Popover from '$lib/components/Shared/ui/Popover';
	export let closable = false;
	const dispatch = createEventDispatcher();
	const toggleMenu = () => dispatch('togglemenu');

	let config: TooltipConifg = {
		body: 'MiniMenu',
		bodyAsHTML: true,
		effect: 'float',
		place: 'bottom',
		type: 'dark',
		style: ''
	};
</script>

<ul class="socials">
	<li class="item">
		{#if $page.data.user}
			<div class="circle" use:Popover={config}> {$page.data.user.nombre[0]}</div>
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
	  .circle {
		cursor:pointer;
        border-radius: 50%;
        width: 22px;
        height: 22px;
        padding: 3px;
        background: #5b025a;
        color: white;
		text-transform: uppercase;
        text-align: center;
        font-size: 16px;
      }
	.ingresa {
		color: white;
		display: flex;
		align-items: center;
	}
	.socials {
		display: flex;
		align-items: center;
		gap: 14px;
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
