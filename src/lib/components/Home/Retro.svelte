<script lang="ts">
</script>

<div class="botonera">
	<button class="btn">Calificar</button>
	<button class="btn--outline">No me interesa</button>
	<button class="btn--outline">Reportar</button>
</div>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;
	.botonera {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	button {
		min-width: 95vw;
		@include mixin.breakpoint(mixin.$sm) {
			min-width: 350px;
		}
	}
</style>
