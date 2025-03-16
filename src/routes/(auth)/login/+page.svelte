<script lang="ts">
	import { page } from '$app/state';
	import { Arrow, Facebook, Google } from '$lib/icons';
	import {
		FacebookAuthProvider,
		GoogleAuthProvider,
		onAuthStateChanged,
		signInWithEmailAndPassword,
		signInWithPopup
	} from 'firebase/auth';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { applyAction } from '$app/forms';
	import { z } from 'zod';

	let userError = $state('');
	let passError = $state('');
	let mensaje = $state('');
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			console.log('user', user);
			const data = new FormData();
			data.append('uid', user.uid);
			const response = await fetch('?/revalidate', {
				method: 'POST',
				body: data
			});
			const result = await response.json();
			if (result.type === 'success') {
				await invalidateAll();
			}
			applyAction(result);
		}
	});

	const loginRedes = async (google: boolean) => {
		const provider = google ? new GoogleAuthProvider() : new FacebookAuthProvider();
		const res = await signInWithPopup(auth, provider);
		const guser = res.user;
		const data = new FormData();
		data.append('provider', google ? 'google' : 'facebook');
		data.append('token', guser.uid);
		data.append('displayName', guser.displayName ?? '');
		data.append('email', guser.email ?? '');
		data.append('photoURL', guser.photoURL ?? '');
		data.append('redirectTo', page.url.searchParams.get('redirectTo')?.toString() ?? '');
		const response = await fetch('?/login', {
			method: 'POST',
			body: data
		});
		const result = await response.json();
		if (result.type === 'success') {
			await invalidateAll();
		}
		applyAction(result);
	};

	async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		const fdata = new FormData(event.currentTarget);

		const username = fdata.get('username')?.toString() ?? '';
		const password = fdata.get('password')?.toString() ?? '';

		const usernameSchema = z.string().trim().min(1, 'Es necesario completar este campo').email('Usuario no válido');
		const usernameValidation: any = usernameSchema.safeParse(username);
		if (!usernameValidation.success) {
			userError = usernameValidation.error.errors[0].message;
		} else {
			userError = '';
		}

		const passSchema = z.string().min(1, 'Es necesario completar este campo');
		const passValidation: any = passSchema.safeParse(username);
		if (!passValidation.success) {
			passError = passValidation.error.errors[0].message;
		} else {
			passError = '';
		}

		if (userError || passError) {
			return;
		}

		try {
			const res = await signInWithEmailAndPassword(auth, username, password);
			auth.languageCode = 'es';

			const guser = res.user;
			const data = new FormData();
			data.append('provider', 'google');
			data.append('token', guser.uid);
			data.append('displayName', guser.displayName ?? '');
			data.append('email', guser.email ?? '');
			data.append('photoURL', guser.photoURL ?? '');
			data.append('redirectTo', page.url.searchParams.get('redirectTo')?.toString() ?? '');
			const response = await fetch('/login', {
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
			if (error.code == 'auth/wrong-password') {
				passError = 'Credenciales no válidas';
			}

			if (error.code == 'auth/user-not-found') {
				userError = 'La cuenta ingresada no existe';
			}

			if (error.code == 'auth/user-disabled') {
				userError = 'La cuenta no está habilitada';
			}

			if (error.code == 'auth/invalid-email') {
				userError = 'Cuenta no vàlida';
			}
		}
	}
</script>

<div class="login">
	<h1 class="titulo--suprayado">Bienvenido</h1>

	<p class="mt-20">Puede ingresar con su cuenta de:</p>
	<div class="socials">
		<button class="btn-social" type="button" onclick={() => loginRedes(true)}><Google /></button>
		<button class="btn-social" type="button" onclick={() => loginRedes(false)}><Facebook /></button>
	</div>
	<form method="POST" onsubmit={handleSubmit} class="mt-40">
		<div class="form">
			<div class="form-group">
				<label for="username">Ingresar con su cuenta de correo</label>
				<input
					type="text"
					name="username"
					placeholder="Ejem. usuario@mail.com"
					class:error={userError ? true : false}
				/>
				{#if userError}
					<div class="error">{userError}</div>
				{/if}
			</div>
			<div class="form-group">
				<label for="password">Contraseña</label>
				<input type="password" name="password" placeholder="*********" class:error={passError ? true : false} />
				{#if passError}
					<div class="error">{passError}</div>
				{/if}

				<div class="opciones">
					<div class="checkboxes">
						<div>
							<input type="checkbox" name="recordar" />
						</div>
						<div>
							<label for="recordar">Recordar usuario</label>
						</div>
					</div>
					<a href="/recuperar" class="link">¿Olvidaste tu contraseña?</a>
				</div>
			</div>
			<div>
				<button class="btn mt-20" type="submit"><span>Ingresar</span>&nbsp; <Arrow /></button>
			</div>
		</div>
	</form>

	<div class="mt-20 alcentro">
		<p>
			Si no tienes una cuenta <a href="registro" class="link">Regístrate</a>
		</p>
	</div>
</div>

<style lang="scss">
	@use '$lib/scss/form' as form;
	@use '$lib/scss/breakpoints' as mixin;

	.checkboxes {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 8px;

		label {
			font-size: 14px !important;
			font-weight: 300 !important;
		}

		input {
			width: 20px;
			height: 20px;
		}
	}
	.opciones {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.link {
		color: #d30ed1;
	}

	.login {
		margin: 0 auto;
		max-width: 95vw;
		padding-top: 12px;
		@include mixin.breakpoint(mixin.$sm) {
			max-width: 380px;
		}
	}

	.socials {
		margin-bottom: 24px;
		display: flex;
		gap: 10px;

		.btn-social {
			background: #ffffff;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			padding: 10px 0px;
			width: 100%;
		}
	}
</style>
