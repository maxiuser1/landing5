<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Close from '$lib/icons/Close.svelte';
	import User from '$lib/icons/User.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { entradas } = data;
	let isOpen = false;
	let paso: 'inicio' | 'traspaso' | 'traspaso-verificado' = 'inicio';
	let transferable: App.User | null = null;
</script>

<section class="entradas">
	<div class="container">
		<div />
		<div class="main">
			<h1>Mis entradas</h1>
			<div class="tickets">
				{#each entradas as entrada, idx}
					<div class="ticket" class:zebra={idx % 2 == 0}>
						<div class="avatar">Av</div>
						<div class="titulos">
							<h6 class="h7">{entrada.evento.artista}</h6>
						</div>
						<div>zona</div>
						<div class="spacer" />
						<div>
							<button
								class="btn"
								on:click={() => {
									isOpen = true;
								}}>No lo quiero</button
							>
						</div>
					</div>
				{/each}
				{#if isOpen}
					<div class="modal-overlay" />
				{/if}
			</div>
		</div>
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
					<h4>No lo quiero</h4>
					<p>¿Qué deseas hacer con tu entrada?</p>
					<div class="botonera">
						<button class="btn">Revender</button>
						<button
							class="btn btn--alt "
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
								console.log('data', data);
								console.log('result', result);
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
				<div>
					hi

					{JSON.stringify(transferable)}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@import './static/style.scss';

	.traspaso {
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

	.spacer {
		flex-grow: 1;
	}
	.zebra {
		background-color: #f9f9f9;
	}

	.ticket {
		display: flex;
		flex-direction: row;
		border-radius: 8px;
		padding: 19px;
		gap: 20px;
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
