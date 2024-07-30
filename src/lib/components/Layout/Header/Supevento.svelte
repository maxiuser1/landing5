<script lang="ts">
	import { Arrow } from '$lib/icons';
	import Autenticable from './Autenticable.svelte';
	import Logo from './Logo.svelte';
	import { page } from '$app/stores';

	export let slug: string;

	let visible = false;

	const toggle = () => {
		visible = !visible;
	};
</script>

<header class="header">
	<nav class="container">
		<div class="backlogo">
			{#if $page.url.pathname == `/${slug}`}
				<a href="../../../">
					<Arrow left={true} />
				</a>
			{:else}
				<a href="../../../{slug}">
					<Arrow left={true} />
				</a>
			{/if}

			<Logo />
		</div>
		<div />
	</nav>
</header>

<style lang="scss">
	@import './static/style.scss';

	.backlogo {
		display: flex;
		gap: 20px;
		align-items: center;

		padding-left: 16px;

		@include breakpoint($md) {
			padding: initial;
		}
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
