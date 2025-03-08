<script lang="ts">
	import { page } from '$app/state';
</script>

<ul class="socials">
	{#if page.data.user}
		<li class="item">
			<div class="circle"></div>
		</li>
	{:else}
		<li>
			<a class="ingresa" href="../login"> Ingresa </a>
		</li>
		<li>/</li>
		<li>
			<a class="ingresa" href="../registro"> Regístrate </a>
		</li>
	{/if}
</ul>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
	.circle {
		cursor: pointer;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		padding: 5px;
		background: #5b025a;
		color: white;
		text-transform: uppercase;
		text-align: center;
		font-size: 12px;
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

	.last {
		display: none;

		@include mixin.breakpoint(mixin.$md) {
			display: initial;
			cursor: pointer;
			border-left: 2px solid #ff888f;
			padding-left: 24px;
		}
	}
</style>
