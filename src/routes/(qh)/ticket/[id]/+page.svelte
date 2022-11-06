<script lang="ts">
	import { Box, Greatcheck, Ticket } from '$lib/icons';
	import Pin from '$lib/icons/Pin.svelte';

	export let data;
	let { ticket } = data;

	const options: any = { weekday: 'short', month: 'long', day: 'numeric' };
</script>

<section class="container main no-print">
	<Greatcheck />
	<h1>Esta listo tu ticket!</h1>
</section>

<section class="container">
	<div class="tarjeta">
		<div class="qrcode">
			<img src={ticket.qrcode} alt="qrcode" />
		</div>
		<div class="headings">
			<h1>{ticket.evento.nombre}</h1>
			<h4>{ticket.evento.artista}</h4>
		</div>
		<div class="subheadings">
			<h6 class="h7">
				<strong>
					{new Date(ticket.evento.fecha).toLocaleDateString('es-PE', options)}
				</strong>
			</h6>
			<p>
				<Pin />
				{ticket.evento.lugar}
			</p>
		</div>
		<div class="grilla">
			{#each ticket.entradas as entrada, i}
				<div class="ticket odd">
					<div class="asiento">
						<div>
							<Box width={30} color="red" disabled={false} />
						</div>
						<div class="etiquetas">
							<h6><strong>{entrada.nombre}</strong></h6>
							<p>
								{#if entrada.numerado}
									<p>
										Lugar: {entrada.fila}
										{entrada.asiento}
									</p>
								{/if}
							</p>
						</div>
					</div>
					<div>
						<h6>
							<strong>
								S/ {entrada.base?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							</strong>
						</h6>
					</div>
				</div>
			{/each}

			<div class="ticket totales">
				<div class="asiento">
					<div>
						<Ticket />
					</div>
					<div class="etiquetas">
						<h5>
							<strong>Total:</strong>
						</h5>
					</div>
				</div>
				<div>
					<h5>
						<strong>
							S/ {ticket.monto}
						</strong>
					</h5>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="container ctas no-print">
	<div>
		<button
			class="btn-outline"
			on:click={() => {
				window.print();
			}}
		>
			Imprimir constancia
		</button>
		<button class="btn"> Enviar al correo </button>
	</div>
</section>

<style lang="scss">
	.tarjeta {
		text-align: center;
		border-radius: 8px;
		background: white;
		padding: 24px;

		.headings {
			border-bottom: 1px solid #e2e2e2;
			padding-bottom: 16px;
			margin-bottom: 16px;
		}

		.subheadings {
			p {
				margin-top: 8px;
				font-size: 14px;
			}

			margin-bottom: 48px;
		}

		.grilla {
			.ticket {
				min-width: 300px;
				padding: 32px;
				border-radius: 8px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				gap: 10px;

				.asiento {
					display: flex;
					align-items: center;
					gap: 10px;

					.etiquetas {
						text-align: left;
						padding-left: 24px;
						h6 {
							margin-bottom: 6px;
						}
					}
				}

				&.odd {
					background: #f9f9f9;
				}

				@include breakpoint($sm) {
					min-width: 400px;
				}

				@include breakpoint($md) {
					min-width: 500px;
				}
			}

			@include breakpoint($md) {
				margin: 0 auto;
				max-width: 632px;
			}
		}
	}
	.main {
		margin-top: 100px;
		margin-bottom: 78px;
		text-align: center;

		.qrcode {
			width: 200px;
			margin: 0 auto;
		}

		h1 {
			margin-top: 42px;
			font-size: 42px;
			line-height: 50px;
			font-weight: 900;
		}
	}

	.ctas {
		text-align: center;
		margin-top: 48px;
		margin-bottom: 48px;
	}
</style>
