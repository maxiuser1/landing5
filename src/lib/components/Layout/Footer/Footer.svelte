<script>
	import Logo from '../Header/Logo.svelte';
</script>

<section class="infrafooter">
	<div class="container">
		<div class="derechos">
			<Logo />
		</div>
	</div>
</section>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;
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
</style>
