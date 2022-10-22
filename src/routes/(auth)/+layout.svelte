<script>
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
		<div class="overlay" />
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
	.principal {
		background-color: #ffffff !important;
		display: flex;
		flex: 1 1 100%;
		align-items: stretch;
		justify-content: space-between;
	}

	.banner {
		display: none;
		min-width: 50%;
		height: 100vh;
		background: linear-gradient(180deg, #ff0030 0%, #ff00ad 53.12%, #9023fe 100%);
		@include breakpoint($sm) {
			display: initial;
		}
	}

	.overlay {
		width: 100%;
		height: 100vh;

		background: url('https://res.cloudinary.com/maxitech/image/upload/v1658348860/ticketera/assets/people-in-festival_1_w8qpie.png');
		background-size: cover;
	}

	.header {
		width: 100%;
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		background: linear-gradient(270deg, var(--red) 0%, var(--pink) 100%);

		@include breakpoint($sm) {
			display: none;
		}

		nav {
			margin: 0 auto;
			height: var(--header-height);
			text-align: center;
			padding-top: 20px;
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
			margin-top: 102px;
			@include breakpoint($sm) {
				margin-top: initial;
				// padding-top: 42px;
				// margin-top: 42px;

				max-height: 100vh;
				overflow-x: auto;
			}
		}
	}
</style>
