<script lang="ts">
	import Autenticable from './Autenticable.svelte';
	import Logo from './Logo.svelte';
	let visible = false;
</script>

<header class="header">
	<nav class="container">
		<div />
		<Autenticable />
	</nav>
</header>

<style lang="scss">
	@import './static/style.scss';

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
		@include breakpoint($md) {
			display: block;
		}

		nav {
			margin: 0 auto;
			height: var(--header-height);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
