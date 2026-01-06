<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Arrow from '$lib/icons/Arrow.svelte';
	import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
	import { auth } from '../../../firebase';

	let mensaje = $state('');

	async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
			
		try {
			let data = new FormData(event.currentTarget);
			const email = data.get('correo')?.toString() ?? '';
			const res = await sendPasswordResetEmail(auth, email);
			mensaje = 'Hemos enviado un correo a la casilla ingresada, porfavor siga ahí las instrucciones.';
		} catch (error: any) {
			mensaje = error.message;
			if (error.code == 'auth/wrong-password') {
				mensaje = 'Credenciales no válidas';
			}

			if (error.code == 'auth/user-not-found') {
				mensaje = 'La cuenta ingresada no existe';
			}

			if (error.code == 'auth/user-disabled') {
				mensaje = 'La cuenta no está habilitada';
			}

			if (error.code == 'auth/invalid-email') {
				mensaje = 'Cuenta no válida';
			}
		}
		
	}
</script>

<div class="login">
	<a href="/login" class="btn-outline">
		<Arrow color="#D30ED1" left={true} />
		Volver al login
	</a>
	<h1 class="titulo--suprayado mt-20">Registro</h1>

	<form method="POST" onsubmit={handleSubmit} class="mt-20">
		<div class="form">
			<div class="form-group">
				<label for="correo">Correo</label>
				<input type="email" name="correo" />
			</div>
		
		</div>
		{#if mensaje}
			<div class="error">{mensaje}</div>
		{/if}
		<div>
			<button class="btn mt-20 mb-40" type="submit">Registrarse <Arrow /></button>
		</div>
	</form>
</div>

<style lang="scss">
	@use '$lib/scss/form' as form;
	@use '$lib/scss/breakpoints' as mixin;

	.btn {
		width: 100%;
	}

	.login {
		margin: 0 auto;
		max-width: 95vw;
		padding-top: 12px;
		@include mixin.breakpoint(mixin.$sm) {
			max-width: 380px;
		}
	}
</style>
