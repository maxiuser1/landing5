<script>
	import Logo from '$lib/components/Layout/Header/Logo.svelte';
	let { children } = $props();
</script>

<div class="principal">
	<div class="banner">
		<div class="overlay">
			<div></div>
			<div class="logos">
				<Logo size={'120px'} />
			</div>
			<div></div>
		</div>
	</div>
	<div class="forms">
		<div class="header">
			<nav>
				<Logo />
			</nav>
		</div>
		<div class="contenido">
			{@render children()}
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../../static/style.scss' as mixin;

	.principal {
		background-color: #ffffff !important;
		display: flex;
		flex: 1 1 100%;
		align-items: stretch;
		justify-content: space-between;
	}

	.banner {
		display: none;
		min-width: 37%;
		height: 100vh;
		background: #d30ed1;
		@include mixin.breakpoint(mixin.$sm) {
			display: initial;
		}
	}

	.overlay {
		width: 100%;
		height: 100vh;

		background: url('https://epcdnqhprd.azureedge.net/images/site/overl.png');
		background-size: cover;
		background-position: center center;
		display: flex;
		flex-direction: column;
		align-self: flex-end;
		justify-content: space-between;
		.logos {
			margin: 0 auto;
		}
	}

	.header {
		width: 100%;
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		background: linear-gradient(270deg, var(--red) 0%, var(--pink) 100%);

		@include mixin.breakpoint(mixin.$sm) {
			display: none;
		}

		nav {
			margin: 0 auto;
			height: var(--header-height);
			text-align: center;
			padding-top: 10px;
		}
	}

	.forms {
		width: 100%;
		padding-right: 24px;
		padding-left: 24px;
		margin-right: auto;
		margin-left: auto;

		@include mixin.breakpoint(mixin.$sm) {
			margin-top: initial;
		}

		.contenido {
			margin-top: 32px;
			@include mixin.breakpoint(mixin.$sm) {
				margin-top: 102px;
				margin-top: initial;
				max-height: 100vh;
				overflow-x: auto;
			}
		}
	}
</style>
