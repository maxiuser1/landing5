<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;

	let { ticket } = data;
	let posting = false;

	const options: any = { weekday: 'short', month: 'long', day: 'numeric' };

	let cantidad = ticket!.entradas![0].cantidad;
	let picados = ticket.picados ?? 0;
	let resto = cantidad - picados;
	function aplicar() {}
</script>

<section class="container summary">
	<div class="tarjeta">
		<div class="cantidad">
			<form
				method="POST"
				autocomplete="off"
				use:enhance={({ form, data, action, cancel }) => {
					posting = true;
					return async ({ result }) => {
						applyAction(result);
					};
				}}
			>
				<div class="input-group">
					{#if resto < 1}
						<h1>Entradas consumidas</h1>
					{:else}
						<input name="Cantidad" pattern="\d*" type="number" max={resto} min="1" value={resto} placeholder="Cantidad" class="form-control txtcantidad" />
						<button type="submit" class="btn-outline">Picar Tickets</button>
					{/if}
				</div>
			</form>
		</div>
		<div class="headings">
			{#if ticket.entradas}
				<h1>Entrada {ticket.entradas[0].tipo}</h1>
			{/if}
			<h1>Compradas: {cantidad}</h1>
			<h1>Picadas: {picados}</h1>
			<br />
			<br />
			<br />
			<h2>{ticket.evento.nombre}</h2>
			<br />
			<div class="subheadings">
				<h6 class="h7">
					<strong>
						{#if ticket.evento && ticket.evento.fecha}
							{new Date(ticket.evento.fecha).toLocaleDateString('es-PE', options)}
						{/if}
					</strong>
				</h6>
				<p>
					{ticket.evento.lugar}
				</p>
			</div>
		</div>
		<div class="subheadings">
			<p>{ticket.cliente?.nombre} {ticket.cliente?.apellido}</p>
			<p>{ticket.cliente?.correo}</p>
		</div>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.txtcantidad {
		font-size: 40px;
	}

	.cantidad {
		max-width: 300px;
		margin: 0 auto;
	}
	.footer {
		p {
			font-size: 12px;
			margin-top: 20px;
		}
	}
	.content-modal {
		padding: 12px;
	}
	.modal {
		background: white;
		border: none;
		margin: 0 auto;
		margin-top: 24px;

		input {
			min-width: 250px;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}

		.form-group {
			margin-bottom: 32px;
		}

		.btn {
			width: 100%;
			font-weight: 600;
			font-size: 16px;
			line-height: 24px;
		}
	}

	.modal::backdrop {
		background: rgb(0 0 0 / 0.4);
	}

	.summary {
		padding-left: initial;
		padding-right: initial;
	}

	.subheadings {
		p {
			margin-top: 8px;
			font-size: 14px;
		}

		margin-bottom: 16px;
	}

	.tarjeta {
		text-align: center;
		border-radius: 8px;
		background: white;
		padding: 60px 24px 0px;
		@include breakpoint($md) {
			margin-bottom: 400px;
			padding: 48px 24px 40px;
		}

		.headings {
			border-bottom: 1px solid #e2e2e2;
			margin-top: 45px;
			margin-bottom: 16px;
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
				margin-top: 20px;

				@include breakpoint($sm) {
					min-width: 400px;
				}

				@include breakpoint($md) {
					min-width: 500px;
				}

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
			}

			@include breakpoint($md) {
				margin: 0 auto;
				max-width: 632px;
			}
		}
	}
	.ready {
		margin-top: 84px;
		margin-bottom: 60px;
		text-align: center;

		@include breakpoint($md) {
			margin-top: 100px;
			margin-bottom: 79px;
		}

		h1 {
			margin-top: 32px;

			@include breakpoint($md) {
				margin-top: 42px;
			}
		}
	}

	.ctas {
		text-align: center;
		margin-top: 48px;
		margin-bottom: 48px;
	}
</style>
