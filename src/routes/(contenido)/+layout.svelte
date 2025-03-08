<script lang="ts">
	import Footer from '$lib/components/Layout/Footer/Footer.svelte';
	import HomeFooter from '$lib/components/Layout/Footer/Home-Footer.svelte';
	import Autenticable from '$lib/components/Layout/Header/Autenticable.svelte';
	import HomeHeader from '$lib/components/Layout/Header/Home-Header.svelte';
	import Logo from '$lib/components/Layout/Header/Logo.svelte';
	import Sup from '$lib/components/Layout/Header/Sup.svelte';
	import { Arrow } from '$lib/icons';

	let { children } = $props();
</script>

<header class="header">
	<nav class="container">
		<div class="backlogo">
			<a href="/">
				<Arrow left={true} />
			</a>
			<Logo />
		</div>
		<div></div>
		<Autenticable />
	</nav>
</header>
<main>{@render children()}</main>
<Footer />

<style lang="scss">
	@forward '../../../static/container.scss';
	.backlogo {
		display: flex;
		gap: 20px;
		align-items: center;
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
