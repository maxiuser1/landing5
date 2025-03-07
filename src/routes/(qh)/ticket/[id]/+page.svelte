<script lang="ts">
	import { Box, Greatcheck, Tarjeta, Ticket } from '$lib/icons';
	import { page } from '$app/stores';
	import Pin from '$lib/icons/Pin.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { onMount, tick } from 'svelte';
	import { loadFull } from 'tsparticles';
	import { tsParticles } from 'tsparticles-engine';
	import { confetiConfig } from '$lib/components/Home/particles';
	import type { PageData } from './$types';
	import { EventosRepo } from '$lib/repos';
	import { clearCompradata } from '$lib/components/Evento/store';
	import Deathbox from '$lib/icons/Deathbox.svelte';
	import { letrar } from '$lib/utils/letrador';
	import { Descuento, Regalo } from '$lib/components/Evento';

	export let data: PageData;

	let { ticket } = data;
	let dialog: any;

	onMount(async () => {
		clearCompradata();
		await loadFull(tsParticles);
		await tsParticles.load('tsparticles', confetiConfig);
	});

	const options: any = { weekday: 'short', month: 'long', day: 'numeric' };
</script>

<section class="container ready no-print">
	<Greatcheck />

	{#if ticket.canal === 'PROMOTOR'}
		<h1 class="h1xs">Listo!</h1>
	{/if}

	{#if ticket.canal === 'WEB'}
		<h4 class="h1xs">{ticket.pago?.dataMap?.ACTION_DESCRIPTION}</h4>
		<br />
		<div class="subheadings">
			<p><Tarjeta color="pink" /> {ticket.pago?.dataMap?.TRACE_NUMBER}</p>
		</div>
	{/if}
</section>

<section class="container summary">
	<div class="tarjeta">
		{#if ticket.qrcode}
			<div class="qrcode">
				<img src={ticket.qrcode} alt="qrcode" />
			</div>
		{/if}

		<div class="headings">
			<h2>{ticket.evento.nombre}</h2>
			<h3>{ticket.evento.artista}</h3>
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
					<Pin />
					{ticket.evento.lugar}
				</p>
			</div>
		</div>
		<div class="subheadings">
			<p>{ticket.cliente?.nombre} {ticket.cliente?.apellido}</p>
			<p>{ticket.cliente?.correo}</p>
		</div>

		<div class="grilla">
			{#if ticket.entradas}
				{#each ticket.entradas as entrada, i}
					<div class="ticket odd">
						<div class="asiento">
							<div>
								{#if entrada.numerado}
									<Deathbox width={80} disabled={false} tomado={true} />
								{:else}
									<Ticket />
								{/if}
							</div>
							<div class="etiquetas">
								<h6><strong>{entrada.nombre}</strong> x{entrada.cantidad ?? ''}</h6>
								<p>
									{#if entrada.numerado}
										<p>
											{letrar(entrada.fila ?? 0)}-{entrada.asiento}
										</p>
									{:else}
										<p>
											cantidad: <strong> {entrada.cantidad} </strong>
										</p>
									{/if}
								</p>
							</div>
						</div>
						<div>
							<h6>
								<strong>
									S/ {entrada.final?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
								</strong>
							</h6>
						</div>
					</div>
					<div>
						<!-- {#if entrada.descuento && entrada.descuento.nombre}
							<Descuento descuento="{entrada.descuento.nombre} -%{entrada.descuento.valor}" />
						{/if} -->
					</div>
				{/each}
			{/if}

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
		<button
			type="button"
			class="btn"
			on:click={() => {
				dialog.showModal();
			}}
		>
			Enviar al correo
		</button>
	</div>
	<div class="footer">
		<br />
		{#if ticket.fecha}
			<p>{new Date(ticket.fecha).toLocaleDateString('es-PE', options)}</p>
		{/if}
		<p>#{ticket.numero}</p>
	</div>
</section>

<dialog bind:this={dialog} class="modal" id="modal">
	<div class="content-modal">
		<form
			method="POST"
			use:enhance={({ form }) => {
				return async ({ result, update }) => {
					dialog.close();
					if (result.type === 'success') {
						form.reset();
					}
					if (result.type === 'failure') {
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<div class="form-group">
				<input type="email" name="email" value={$page.data?.user?.correo} />
			</div>
			<button type="submit" class="btn"> Enviar </button>
		</form>
	</div>
</dialog>

<div id="tsparticles" />

<style lang="scss">
	@use './static/style.scss' as mixin;
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
		@include mixin.breakpoint(mixin.$md) {
			padding: 48px 24px 0px;
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

				@include mixin.breakpoint(mixin.$sm) {
					min-width: 400px;
				}

				@include mixin.breakpoint(mixin.$md) {
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

			@include mixin.breakpoint(mixin.$md) {
				margin: 0 auto;
				max-width: 632px;
			}
		}
	}
	.ready {
		margin-top: 84px;
		margin-bottom: 60px;
		text-align: center;

		@include mixin.breakpoint(mixin.$md) {
			margin-top: 100px;
			margin-bottom: 79px;
		}

		h1 {
			margin-top: 32px;

			@include mixin.breakpoint(mixin.$md) {
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
