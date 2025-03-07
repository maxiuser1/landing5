<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { Greatcheck } from '$lib/icons';
	import Close from '$lib/icons/Close.svelte';
	import Impresora from '$lib/icons/Impresora.svelte';
	import Settings from '$lib/icons/Settings.svelte';
	import User from '$lib/icons/User.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { entradas } = data;
	let isOpen = false;
	let paso: 'inicio' | 'traspaso' | 'traspaso-verificado' | 'traspaso-realizado' = 'inicio';
	let transferable: App.User | null = null;
	let entradaId: string | undefined = '';
</script>

<section class="container">
	<div class="tickets">
		<h1>Mis entradas</h1>
		<table>
			{#each entradas as entrada, idx}
				<tr>
					<td>
						<img src="/img/evento.png" alt="evento" />
					</td>
					<td>
						<h6 class="h7">{entrada.evento.artista}</h6>
					</td>
					<td>
						{#if entrada.entradas && entrada.entradas[0]}
							{entrada.entradas[0].nombre}
						{/if}
					</td>
					<td>
						<button
							class="btn"
							on:click={() => {
								entradaId = entrada.id;
								isOpen = true;
							}}
						>
							<Settings />
						</button>

						<a href="https://quehay.pe/{entrada.slug}/ticket/{entrada.id}" target="_blank" class="link-btn">
							<Impresora />
						</a>
					</td>
				</tr>
			{/each}
		</table>

		{#if entradas.length == 0}
			<div class="mensaje">Sin entradas</div>
		{/if}

		{#if isOpen}
			<div class="modal-overlay" />
		{/if}
	</div>
</section>

{#if isOpen}
	<div class="modal">
		<div class="modal-close">
			<button
				class="btn--clean"
				on:click={() => {
					isOpen = false;
				}}
			>
				<Close color="black" />
			</button>
		</div>
		<div class="modal-title" />
		<div class="modal-content">
			{#if paso === 'inicio'}
				<div class="inicio">
					<p>¿Qué deseas hacer con tu entrada?</p>
					<div class="botonera">
						<button class="btn">Revender</button>
						<button
							class="btn btn--alt"
							on:click={() => {
								paso = 'traspaso';
							}}>Traspasar</button
						>
					</div>
				</div>
			{/if}

			{#if paso === 'traspaso'}
				<div class="traspaso">
					<h4>Traspasar</h4>
					<p>Para poder traspasar tu entrada, tienes que colocar el correo electrónico de la persona que lo recibirá y validarlo.</p>
					<form
						autocomplete="off"
						method="POST"
						action="?/traspaso"
						use:enhance={({ form, data, action, cancel }) => {
							return async ({ result }) => {
								transferable = result.data.user;
								paso = 'traspaso-verificado';
								await applyAction(result);
							};
						}}
					>
						<div class="form-group">
							<label for="email">Correo electrónico</label>
							<input type="email" name="email" placeholder="Ejem. usuario@mail.com" required />
						</div>
						<div>
							<button class="btn" type="submit">Validar</button>
						</div>
					</form>
				</div>
			{/if}

			{#if paso === 'traspaso-verificado'}
				<div class="traspaso-verificado">
					<h4>Traspasar</h4>
					<p>Correo validado correctamente. Puedes seguir con el proceso de traspaso.</p>

					<form
						autocomplete="off"
						method="POST"
						action="?/traspasar"
						use:enhance={({ form, data, action, cancel }) => {
							return async ({ result }) => {
								entradas = entradas.filter((t) => t.id !== entradaId);
								paso = 'traspaso-realizado';
								await applyAction(result);
							};
						}}
					>
						<input type="hidden" name="entradaId" value={entradaId} />
						<input type="hidden" name="transferableId" value={transferable?.id} />
						<div class="form-group">
							<label for="email">Nombre</label>
							<input type="email" name="email" disabled value={transferable?.nombre ?? ''} />
						</div>
						<div class="form-group">
							<label for="email">Correo electrónico</label>
							<input type="email" name="email" disabled value={transferable?.correo ?? ''} />
						</div>
						<div>
							<button class="btn" type="submit">Traspasar</button>
						</div>
					</form>
				</div>
			{/if}

			{#if paso === 'traspaso-realizado'}
				<div class="traspaso-realizado">
					<Greatcheck />

					<div>
						<h3><b>Traspaso exitoso</b></h3>
						<p>Se realizó el traspaso correctamente</p>
						<button
							class="btn"
							type="button"
							on:click={() => {
								paso = 'inicio';
								entradaId = undefined;
								transferable = null;
								isOpen = false;
							}}>Aceptar</button
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@use './static/style.scss' as mixin;

	.mensaje {
		margin: 50px;
		font-size: 26px;
	}

	.container {
		margin-top: 20px;
		background-color: white;
		h1 {
			margin-top: 100px;
			margin-left: 20px;
		}
	}

	.traspaso-realizado {
		text-align: center;
		h3 {
			margin-top: 40px;
		}

		button {
			margin-top: 32px;
			min-width: 100%;
		}
	}

	.traspaso,
	.traspaso-verificado {
		.form-group {
			padding-left: initial;
			padding-right: initial;
		}

		form {
			margin-top: 24px;
		}

		.btn {
			margin-top: 32px;
			width: 100%;
			color: white;
		}
	}

	.inicio {
		text-align: center;

		.botonera {
			margin-top: 32px;
		}
	}

	.modal-overlay {
		transition: opacity 0.2s ease-out;
		pointer-events: none;
		background: rgba(#0f172a, 0.8);
		position: fixed;
		opacity: 0;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;

		pointer-events: all;
		opacity: 0.5;
	}

	.link-btn {
		padding: 19px 16px 16px;
		background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
		border-radius: 4px;
	}

	.modal {
		background: #ffffff;
		border-radius: 0.5em;
		box-shadow: 0 10px 20px rgba(black, 0.2);
		left: 50%;
		max-width: 90%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 30em;
		text-align: left;
		max-height: 90vh;
		display: flex;
		flex-direction: column;

		.modal-close {
			align-items: center;
			color: #111827;
			display: flex;
			height: 4.5em;
			justify-content: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 4.5em;

			svg {
				display: block;
			}
		}

		.modal-title {
			padding: 1em 2em;
			pointer-events: all;
			position: relative;
		}

		.modal-content {
			padding: 2em;
			pointer-events: all;
			overflow: auto;

			p {
				margin-top: 16px;
			}
		}
	}

	.tickets {
		margin-top: 48px;
		display: flex;
		flex-direction: column;
		gap: 20px;

		table {
			tr {
				background: #f9f9f9;
			}

			tr:nth-of-type(2n) {
				background: white;
			}
			td {
				display: block;
				padding: 18px;

				@include mixin.breakpoint(mixin.$md) {
					display: table-cell;
				}
			}
		}
	}
</style>
