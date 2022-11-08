<script lang="ts">
	import { Pin } from '$lib/icons';

	export let evento: App.Evento;
</script>

<section class="container">
	<div class="info ">
		<div>
			<h4>Fechas</h4>
			<h6>
				{#each evento.fechas as fecha}
					{new Date(fecha.dia).toLocaleDateString()}
				{/each}
			</h6>

			<p class="lastp">
				<Pin />
				<span class="luagar"> {evento.ubicacion?.nombre}</span>
			</p>
		</div>
		<div class="map" />
	</div>
</section>

<style lang="scss">
	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 80px;

		flex-direction: column;
		gap: 20px;
		@include breakpoint($md) {
			flex-direction: row;
		}

		h4 {
			margin-bottom: 16px;
		}

		p.lastp {
			margin-top: 8px;
			margin-bottom: 60px;
		}

		.luagar {
			font-weight: 400;
			font-size: 14px;
			line-height: 16px;
			color: #1b1b1b;
		}
	}
</style>
