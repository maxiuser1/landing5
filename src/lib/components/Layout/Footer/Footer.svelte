<script>
	import Logo from '../Header/Logo.svelte';
	import Socials from './Socials.svelte';
	const anio = new Date().getFullYear();
</script>

<section class="infrafooter">
	<div class="container">
		<div class="derechos">
			<Logo />
		</div>
	</div>
</section>

<style lang="scss">
	@use './static/style.scss' as mixin;
	.derechos {
		font-size: 16px;
		@include mixin.breakpoint(mixin.$md) {
			font-size: 12px;
		}
	}
	.infrafooter {
		padding: 24px 0;
		background-color: #090909;
		text-align: center;
		color: #ffebff;
		div {
			margin: 0 auto;
		}
	}
	.footer {
		padding-top: 20px;
		z-index: 3;
		padding-bottom: 20px;
		color: white;
		background-color: #1b1b1b;
	}

	.container--foter {
		display: flex;
		flex-flow: row wrap;
		flex-direction: column;
		text-align: center;

		@include mixin.breakpoint(mixin.$md) {
			text-align: initial;
			flex-direction: row;
			justify-content: space-between;
		}

		.sigue {
			margin-top: 40px;
		}

		h1 {
			line-height: 22px;
			margin-bottom: 24px;
			font-size: 18px;
			font-weight: normal;

			@include mixin.breakpoint(mixin.$md) {
				font-size: 14px;
			}
		}

		ul.links {
			margin-top: 20px;
			padding-inline-start: 0px;

			li {
				font-weight: 400;
				padding-bottom: 10px;
				font-size: 16px;
				line-height: 19px;

				a {
					color: #ffebff;
					font-size: 12px;
				}
			}
		}
	}

	.libro {
		margin-top: 20px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
