<script lang="ts">
	import { Radio, Pin, Fecha } from '$lib/icons';
	import { Soles } from '$lib/utils/formats';
	import { createEventDispatcher } from 'svelte';

	export let evento: App.Evento;
	export let parrilla: App.ParrillaPrecio;

	let zona = '';
	const dispatch = createEventDispatcher();

	function continuarHandler(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (zona) {
			dispatch('seleccionar', { zona });
		} else {
			alert('Seleccione el sector');
		}
	}

	function onChangeSelect(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		if (zona) {
			dispatch('seleccionar', { zona });
		} else {
			alert('Seleccione el sector');
		}
	}
</script>

<div style="background-color: #000;">
	<section class="zona">
		<div class="tabs">
			<ul>
				<li class="active">Elije tu zona</li>
				<li>Resumen</li>
				<li>Compra</li>
			</ul>
		</div>

		<h2>Entrada</h2>
		<div class="selector">
			<div>Seleccionar el sector</div>
			<div>
				<select id="ddlSector" bind:value={zona} on:change={onChangeSelect}>
					<option value="">Zona</option>
					{#each evento.precios as precio, idx}
						<option value={precio.nombre}>{precio.nombre}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="tabla">
			<table>
				<thead>
					<tr>
						<th class="nada" />
						{#each parrilla.titulos as titulo, idx}
							<th
								>{titulo.label}
								<span class="fecha-valido">Válido desde {titulo.desde} hasta {titulo.hasta}</span>
							</th>
						{/each}
						<th>Regular</th>
					</tr>
				</thead>
				<tbody>
					{#if parrilla.items}
						{#each parrilla.items as precio, idx}
							<tr>
								<td class="radio">
									<div class="radio">
										<!-- <Radio color={precio.color ? precio.color : ''} /> -->
										{precio.zona}
									</div>
								</td>
								{#each precio.items as item, idy}
									<td>
										{#if item.precio && item.precio > 0}
											<Soles number={item.precio} />
										{/if}
									</td>
								{/each}
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
		<img class="zonasimg" src="https://mlhmwdnd0t7t.i.optimole.com/co-ZpyQ-7fAbE9H5/w:auto/h:auto/q:auto/id:d3461800066d41be8597a27f5f5826cf/directUpload/web-1.png" alt="zonas2" />
	</section>
	<section class="textos">
		<h3>FIESTA MÍSTICA</h3>
		<h4>AÑO NUEVO 2025</h4>
		<div style="display: flex; gap:8px; justify-content: center; margin-bottom: 24px;">
			<div style="display: flex; gap:4px; align-items: center;">
				<Pin />
				EXPLANADA AGUA DULCE
			</div>
			<div>
				<Fecha />
				31-12-2024
			</div>
		</div>
		<div style="max-width: 348px; margin:0 auto;">
			<p>
				Recibe el 2025 en La Fiesta Mística, <br />el evento más esperado del año en Lima. Pamela Franco, Grupo Río, Bareto y Brenda Carvalho serán parte de una noche mágica con show de ilusionismo, túnel místico, fuegos artificiales y experiencias
				únicas como chamán, baño de florecimiento y más. Compra tus entradas en www.quehay.pe antes de que se agoten.
			</p>
			<hr />
			<p>Preventa exclusiva del 25% de descuento en zonas General y VIP, y 10% en zona BOX (stock limitado), hasta agotar stock</p>
		</div>
		<div>
			<button class="btn" on:click={continuarHandler}>Continuar</button>
		</div>
	</section>
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;
	.fecha-valido {
		font-size: 0.5rem;
	}

	.btn {
		margin-top: 35px;
		margin-bottom: 35px;
		border-radius: 50px;
		padding: 12px 44px;
		font-size: 22px;
		font-weight: bold;
	}
	.textos {
		margin-top: 35px;
		text-align: center;
		h3 {
			font-weight: bold;
		}

		h4 {
			font-weight: normal;
			margin-bottom: 12px;
		}

		hr {
			margin-top: 24px;
			margin-bottom: 24px;
			border: 1px solid rgba(255, 0, 0, 0.3);
		}
	}
	.zonasimg {
		width: 100%;
	}

	section {
		margin: 0 auto;
		max-width: 500px;
		background-color: #000;
		color: #ffffff;
	}

	.radio {
		display: flex;
		gap: 4px;
	}
	.zona {
		padding: 25px;

		.tabla {
			margin-top: 35px;

			table {
				width: 100%;
				border-collapse: collapse;
				thead {
					th {
						text-align: center;
						border: 1px solid rgba(255, 0, 0, 0.3);
						padding: 8px;
					}
					.nada {
						border: none;
					}
				}

				tbody {
					td {
						text-align: center;
						border: 1px solid rgba(255, 0, 0, 0.3);
						padding: 8px;
					}
				}
			}
		}
		.selector {
			display: flex;
			align-items: center;
			justify-content: space-between;

			select {
				background: none repeat scroll 0 0 #ffffff;
				border: 1px solid #e5e5e5;
				color: #231f20;
				border-radius: 25px 25px 25px 25px;
				box-shadow: 0 0 10px #e8e8e8 inset;
				font-size: 24px;
				font-weight: bolder;
			}
		}
	}

	.tabs {
		background-color: #ededed;
		border-radius: 60px;
		padding: 8px;
		margin-bottom: 35px;

		ul {
			display: flex;
			gap: 10px;
			li {
				display: block;
				border-radius: 60px;
				padding: 10px;
				color: #000;
			}

			.active {
				display: block;
				border-radius: 60px;
				padding: 10px;
				background-color: #e700d8;
				color: #ffffff;
			}
		}
	}

	.portada {
		img {
			width: 100%;
			height: auto;
		}
	}
	.cta {
		margin-top: 52px;
		margin-bottom: 60px;
		width: 100%;
	}
	.comprar {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 22px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
		border: none;
		font-size: 32px;
		color: white;
		width: 100%;
		min-width: 100%;
	}
	.content-banner {
		width: 100%;
	}
	.banner {
		background: #000;
		background-size: contain; /* <------ */
		background-repeat: no-repeat;
		background-position: center center;
		height: 160px;

		display: flex;
		align-items: flex-end;

		@include mixin.breakpoint(mixin.$md) {
			height: 420px;
		}

		.titulos {
			padding: 0 0 10px 24px;

			color: #ffffff;

			@include mixin.breakpoint(mixin.$md) {
				padding: 0 0 32px 88px;
			}
		}
	}
</style>
