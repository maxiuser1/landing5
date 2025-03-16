<script lang="ts">
	import { applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Arrow from '$lib/icons/Arrow.svelte';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '../../../firebase';

	let mensaje = $state('');

	async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();

		try {
			let data = new FormData(event.currentTarget);

			const username = data.get('correo')?.toString() ?? '';
			const password = data.get('password')?.toString() ?? '';
			const createdUser = await createUserWithEmailAndPassword(auth, username, password);
			const guser = createdUser.user;

			auth.languageCode = 'es';

			data.append('provider', 'email');
			data.append('fbtoken', guser.uid);

			const response = await fetch(event.currentTarget.action, {
				method: 'POST',
				body: data
			});
			const result = await response.json();
			if (result.type === 'success') {
				await invalidateAll();
			}
			applyAction(result);
		} catch (error: any) {
			mensaje = error.message;
			if (error.code == 'auth/email-already-in-use') {
				mensaje = 'Correo ya registrado';
			}

			if (error.code.includes('auth/weak-password')) {
				mensaje = 'Mejora un poco la contraseña';
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
				<label for="dni">Número de documento</label>
				<input type="text" name="dni" required />
			</div>
			<div class="form-group">
				<label for="nombres">Nombres</label>
				<input type="text" name="nombre" required />
			</div>
			<div class="form-group">
				<label for="apellidos">Apellidos</label>
				<input type="text" name="apellido" required />
			</div>
			<div class="form-group">
				<label for="correo">Correo</label>
				<input type="email" name="correo" />
			</div>

			<div class="form-group">
				<label for="telefono">Teléfono</label>
				<input type="text" name="telefono" required />
			</div>

			<div class="form-group">
				<label for="telefono">Ciudad</label>
				<input type="text" name="ciudad" required />
			</div>

			<div class="form-group">
				<label for="password">Contraseña</label>
				<input type="password" name="password" required />
			</div>

			<div class="form-group">
				<label for="password">Repetir contraseña</label>
				<input type="password" name="rpassword" required />
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
