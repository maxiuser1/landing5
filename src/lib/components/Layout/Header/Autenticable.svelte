<script lang="ts">
	import { page } from '$app/state';
	import UserMenu from './User-Menu.svelte';
</script>

<dialog popover id="profile" class="profile-menu">
	<UserMenu />
</dialog>

<ul class="socials">
	{#if page.data.user}
		<li class="item">
			<button popovertarget="profile" class="user-button">
				{page.data.user.nombre[0]}
			</button>
		</li>
	{:else}
		<li>
			<a class="ingresa" href="../login"> Ingresa </a>
		</li>
	{/if}
</ul>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
	.profile-menu {
		position: absolute;
		position-anchor: --profile-button;
		margin: 28px 0 0 0;
		inset: auto;
		top: anchor(top);
		right: anchor(right);
		border: none;
		background: #80057f;
	}

	.user-button {
		position-try-fallbacks: --right;
		padding: 0;
		border-radius: 100vw;
		aspect-ratio: 1;
		width: 24px;
		height: 24px;
		padding: 5px;
		background: #5b025a;
		color: white;
		text-transform: uppercase;
		text-align: center;
		font-size: 12px;
		border: none;
		cursor: pointer;
		anchor-name: --profile-button;
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
		@include mixin.breakpoint(mixin.$md) {
			display: flex;
			align-items: center;
		}
	}
</style>
