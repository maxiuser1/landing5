<script lang="ts">
	import { PUBLIC_NIUBIZ_LIBRE } from '$env/static/public';
	import { Resumen, Steps } from '$lib/components/Evento';
	import { navigating, page } from '$app/stores';
	import Compras from '$lib/components/Evento/Compras.svelte';
	import Mediospago from '$lib/components/Evento/Mediospago.svelte';
	import { compraData } from '$lib/components/Evento/esto.js';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';
	import { Tarjeta } from '$lib/icons/index.js';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import { applyAction } from '$app/forms';

	export let data;
	let { evento } = data;
	let posting = false;
	async function handleSubmit(event: any) {
		const data = new FormData(this);
		data.append('payload', JSON.stringify({ ...$compraData }));
		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});

		const result: ActionResult = await response.json();

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<section class="container">
	<div>
		<div class="principal">
			<div class="steps">
				<Steps paso={4} />
			</div>

			<div class="lugar">
				<Compras />
			</div>
		</div>
	</div>
	<div class="detalles">
		<Resumen {evento} />
		<br />
		<br />
		<br />
		<form method="POST" on:submit|preventDefault={handleSubmit}>
			<div class="form-group">
				<label for="nombres">Información del cliente</label>
				<input type="text" name="nombre" class="form-control" placeholder="Nombre" required />
			</div>
			<div class="form-group">
				<input type="text" name="apellido" class="form-control" placeholder="Apellido" required />
			</div>
			<div class="form-group">
				<input type="text" name="dni" class="form-control" placeholder="DNI" required />
			</div>

			<div class="form-group">
				<input type="email" name="correo" class="form-control" placeholder="Correo" required />
			</div>

			<div class="form-group">
				<select name="tipo" class="form-control">
					<option value="impreso">Con ticket fisico</option>
					<option value="qr">Con generación de código QR</option>
					<option value="autopicado">Con picado automatico</option>
				</select>
			</div>
			<div class="form-group">
				<select name="formaPago" class="form-control">
					<option value="">Forma pago</option>
					<option value="Efectivo">Efectivo</option>
					<option value="Debido">Tarjeta débito</option>
					<option value="Credito">Tarjeta crédito</option>
					<option value="Foranea">Tarjeta foránea</option>
					<option value="Plin">Plin</option>
					<option value="Yape">Yape</option>
					<option value="Transferencia">Transferencia</option>
				</select>
			</div>
			<button type="submit" class="btn" disabled={posting}>
				{#if posting}
					<Spinner size="20" color="#D30ED1" unit="px" />
				{:else}
					Continuar
				{/if}
			</button>
		</form>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';
	.form-group {
		margin-bottom: 20px;
	}
	.steps {
		padding: 40px 16px 31px;
	}

	.lugar {
		border-radius: 8px;
		background: #f9f9f9;

		margin-bottom: 20px;
		padding: 40px 32px;
		h4 {
			font-weight: 100;
			margin-bottom: 10px;
		}

		@include breakpoint($md) {
			margin-right: 24px;
		}
	}

	.container {
		display: grid;
		grid-template-columns: 1fr;
		@include breakpoint($md) {
			grid-template-columns: 728px 352px;
		}
	}

	.detalles {
		padding: 40px 24px;
		min-width: 100%;
		border: 1px solid #fff;
		background: var(--White-White_98, #f9f9f9);
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);

		.btn {
			width: 100%;
			margin-top: 40px;
			font-size: 16px;
			font-weight: 700;
		}
	}
</style>
