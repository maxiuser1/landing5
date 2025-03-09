<script lang="ts">
	import { Arrow } from '$lib/icons';
	import Logo from './Logo.svelte';

	let { volver, children }: { volver: () => void; children?: any | undefined } = $props();
</script>

<header class="header">
	<nav class="container">
		<div class="backlogo">
			<button type="button" onclick={volver}>
				<Arrow left={true} />
			</button>
			<Logo />
		</div>
		<div></div>
		{@render children?.()}
	</nav>
</header>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
	@forward '../../../../../static/container.scss';

	.backlogo {
		display: flex;
		gap: 20px;
		align-items: center;
		button {
			background: none;
			border: none;
			cursor: pointer;
			padding: 0;
		}
	}

	.header {
		width: 100%;
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		background: var(--black);

		nav {
			margin: 0 auto;
			height: var(--header-height);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
