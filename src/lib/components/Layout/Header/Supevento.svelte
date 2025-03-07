<script lang="ts">
	import { Arrow } from '$lib/icons';
	import Autenticable from './Autenticable.svelte';
	import Logo from './Logo.svelte';
	let visible = false;

	const toggle = () => {
		visible = !visible;
	};
</script>

<header class="header">
	<nav class="container">
		<div class="backlogo">
			<a href="../../../">
				<Arrow left={true} />
			</a>
			<Logo />
		</div>
		<div />
		<Autenticable />
	</nav>
</header>

<style lang="scss">
	@use './static/style.scss' as mixin;

	.backlogo {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	.anchormenu {
		color: #fff;
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
