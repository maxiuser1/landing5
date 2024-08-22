<script lang="ts">
	import { Resumen, Steps } from '$lib/components/Evento';
	import Compras from '$lib/components/Evento/Compras.svelte';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import Fecha from '$lib/icons/Fecha.svelte';

	export let data;
	const options: any = { weekday: 'short', month: 'long', day: 'numeric' };
	let { evento, entradas } = data;
</script>

<section class="banner">
	<div class="slide" style="background-image: url('{evento.caratula?.banner}'); background-position: center top;background-size: 100% 100%;">
		<div class="gradiente">
			<div class="titulos">
				<h1>{evento.general.nombre}</h1>
				<h4>{evento.general.artista}</h4>
				<h4>{evento.general.fechas}</h4>
				<h4>{evento.general.horario}</h4>
			</div>
		</div>
	</div>
</section>

<section class="minicontainer principal">
	<h5>Entradas</h5>

	<table class="entradas">
		<thead>
			<tr>
				<th>Fecha</th>
				<th>Hora</th>
				<th>Cliente</th>
				<th>DNI</th>
			</tr>
		</thead>
		<tbody>
			{#each entradas as entrada}
				<tr>
					<td>
						{#if entrada?.evento?.fecha}
							{new Date(entrada?.evento?.fecha).toLocaleDateString('es-PE')}
						{/if}
					</td>
					<td>
						{entrada?.evento?.hora}
					</td>
					<td>
						{entrada?.cliente?.nombre}
						{entrada?.cliente?.apellido}
					</td>
					<td>
						{entrada?.cliente?.dni}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style lang="scss">
	@import './static/style.scss';

	table.entradas {
		width: 100%;
		th {
			text-align: left;
		}
		tr {
			background: white;
		}

		td,
		th {
			padding: 10px;
			border-bottom: 1px solid #f9f9f9;
		}
	}

	.minicontainer {
		background-color: #f9f9f9;
		padding-bottom: 48px;
		@include breakpoint($md) {
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include breakpoint($md) {
			grid-template-columns: 728px 352px;
		}
	}

	.titulos {
		position: absolute;
		z-index: 9;
		left: 10%;
		top: 50%;

		h4 {
			font-size: 18px;
			font-weight: normal;
		}

		h5 {
			font-size: 14px;
			font-weight: normal;
		}

		h1,
		h4,
		h5,
		h6 {
			color: white;
		}
	}

	.slide {
		background-color: #1f0045;
		position: relative;
		background-repeat: no-repeat;
		min-height: 109px;
		max-height: 109px;

		@include breakpoint($sm) {
			min-height: 200px;
			max-height: 200px;
		}

		@include breakpoint($md) {
			min-height: 22.5rem;
			max-height: 22.5rem;
		}
	}

	.banner {
		img {
			width: 100%;
			max-height: 358px;

			@include breakpoint($md) {
				max-height: 420px;
			}
		}

		@include breakpoint($md) {
			height: 420px;
		}
	}

	.gradiente {
		&::before {
			background-color: rgba(0, 0, 0, 0.55);
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
		}
	}
</style>
