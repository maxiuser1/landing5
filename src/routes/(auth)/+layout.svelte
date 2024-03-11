<script>
	import Socials from '$lib/components/Layout/Footer/Socials.svelte';
	import Logo from '$lib/components/Layout/Header/Logo.svelte';
</script>

<svelte:head>
	<style>
		body {
			margin-top: 0 !important;
		}
	</style>
</svelte:head>

<div class="principal">
	<div class="banner">
		<div class="overlay">
			<div />
			<div class="logos">
				<Logo size={'120px'} />
			</div>
			<div />
		</div>
	</div>
	<div class="forms">
		<div class="header">
			<nav>
				<Logo />
			</nav>
		</div>
		<div class="contenido">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';
	.logo--nav {
		height: 20px;
	}
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
		@include breakpoint($sm) {
			display: initial;
		}
	}

	.overlay {
		width: 100%;
		height: 100vh;

		background: url('https://mlhmwdnd0t7t.i.optimole.com/co-ZpyQ-3YYAqoz6/w:auto/h:auto/q:auto/id:009cc655fc2549a3e9ebaae7fc2e9bf0/directUpload/overl.png');
		background-size: cover;
		background-position: center center;
		display: flex;
		flex-direction: column;
		align-self: flex-end;
		justify-content: space-between;
		.logos {
			margin: 0 auto;
		}

		.socials {
			text-align: center;
			display: flex;
			flex-direction: column;
			margin-bottom: 42px;
			gap: 12px;
			.visita {
				width: 100%;
				text-align: center;
				color: white;
			}

			.icons {
				margin: 0 auto;
			}
		}
	}

	.header {
		width: 100%;
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		background: #d30ed1;

		@include breakpoint($sm) {
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

		@include breakpoint($sm) {
			margin-top: initial;
		}

		.contenido {
			margin-top: 32px;
			@include breakpoint($sm) {
				margin-top: 102px;
				margin-top: initial;
				max-height: 100vh;
				overflow-x: auto;
			}
		}
	}
</style>
