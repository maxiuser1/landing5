<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { entradas } = data;
</script>

<section class="entradas">
	<div class="container">
		<div>Presentación</div>
		<div class="main">
			<h1>Mis entradas</h1>
			<div class="tickets">
				{#each entradas as entrada, idx}
					<div class="ticket" class:zebra={idx % 2 == 0}>
						<div class="avatar">Av</div>
						<div class="titulos">
							<h6 class="h7">{entrada.evento.artista}</h6>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

{JSON.stringify(entradas[0])}

<style lang="scss">
	@import './static/style.scss';

	.zebra {
		background-color: #f9f9f9;
	}

	.ticket {
		display: flex;
		flex-direction: row;
		border-radius: 8px;
		padding: 19px;
	}

	.tickets {
		margin-top: 48px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.entradas {
		margin-top: 116px;
	}

	.container {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.main {
		min-width: 100%;
		background-color: white;
		padding: 48px;
	}
</style>
