<script lang="ts">
	import { signInWithPopup, GoogleAuthProvider, type User, FacebookAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
	import { applyAction, enhance } from '$app/forms';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { Facebook, Google } from '$lib/icons';
	import { z } from 'zod';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/userstore';

	let mensaje = '';
	let userError = '';
	let passError = '';

	async function handleGoogleClick() {
		const data = new FormData();
		const provider = new GoogleAuthProvider();
		const res = await signInWithPopup(auth, provider);
		const guser = res.user;
		data.append('provider', 'google');
		data.append('token', guser.uid);
		data.append('displayName', guser.displayName ?? '');
		data.append('email', guser.email ?? '');
		data.append('photoURL', guser.photoURL ?? '');
		data.append('redirectTo', $page.url.searchParams.get('redirectTo')?.toString() ?? '');

		const response = await fetch('/login', {
			method: 'POST',
			body: data
		});
		const result = await response.json();
		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}

	async function handleFormSubmit() {
		const fdata = new FormData(this);

		const username = fdata.get('username')?.toString() ?? '';
		const password = fdata.get('password')?.toString() ?? '';

		const usernameSchema = z.string().trim().email('Usuario no válido').min(1, 'Usuario requerido');
		const usernameValidation: any = usernameSchema.safeParse(username);
		if (!usernameValidation.success) {
			userError = usernameValidation.error.errors[0].message;
		} else {
			userError = '';
		}

		const passSchema = z.string().min(1, 'Contraseña requerida');
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
			const guser = res.user;

			const data = new FormData();

			data.append('provider', 'google');
			data.append('token', guser.uid);
			data.append('displayName', guser.displayName ?? '');
			data.append('email', guser.email ?? '');
			data.append('photoURL', guser.photoURL ?? '');
			data.append('redirectTo', $page.url.searchParams.get('redirectTo')?.toString() ?? '');
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

	async function handleFacebookClick() {
		const data = new FormData();
		const provider = new FacebookAuthProvider();
		const res = await signInWithPopup(auth, provider);
		const guser = res.user;

		data.append('provider', 'facebook');
		data.append('token', guser.uid);
		data.append('displayName', guser.displayName ?? '');
		data.append('email', guser.email ?? '');
		data.append('photoURL', guser.photoURL ?? '');
		data.append('redirectTo', $page.url.searchParams.get('redirectTo')?.toString() ?? '');

		const response = await fetch('/login', {
			method: 'POST',
			body: data
		});

		const result = await response.json();
		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<div class="login">
	<div class="form">
		<a href="/login" class="titulo--suprayado">Bienvenido</a>

		<form autocomplete="off" on:submit|preventDefault={handleFormSubmit}>
			<div class="form-group">
				<label for="username">Usuario</label>
				<input type="text" name="username" placeholder="Ejem. usuario@mail.com" class:error={userError ? true : false} />
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
				<button class="btn" type="submit"><span>Ingresar</span></button>
			</div>
		</form>

		<div class="texto">
			<p>Tambien puedes ingresar con:</p>
		</div>

		<div class="socials">
			<form method="POST" on:submit|preventDefault={handleGoogleClick}>
				<button class="btn-social" type="submit"> <Google /> </button>
			</form>

			<form method="POST" on:submit|preventDefault={handleGoogleClick}>
				<button class="btn-social" type="button" on:click={handleFacebookClick}>
					<Facebook />
				</button>
			</form>
		</div>

		<div class="texto">
			<p>
				Si no tienes una cuenta <a href="registro" class="link">Regístrate</a>
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';

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

		.link {
			margin-top: 12px;
			color: #d30ed1;
		}
	}

	.titulo--suprayado {
		font-size: 32px;
	}

	.login {
		margin: 0 auto;
		max-width: 380px;
		padding-top: 12px;
	}
	.form {
		margin-top: 50px;

		label {
			font-weight: 600;
			font-size: 14px;
			line-height: 24px;
		}

		input {
			min-width: 100%;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}

		.form-group {
			padding-left: initial;
			padding-right: initial;
			&:first-child {
				margin-top: 32px;
			}
			margin-bottom: 32px;
		}

		.btn {
			width: 100%;
			font-weight: 600;
			font-size: 16px;
			line-height: 24px;
		}

		.olvidaste {
			margin-top: 10px;
			width: 100%;
			text-align: right;
			.link {
				color: #d30ed1;
			}
		}

		.socials {
			margin-top: 24px;
			margin-bottom: 24px;
			display: flex;
			gap: 10px;

			form {
				width: 100%;
				.btn-social {
					background: #ffffff;
					/* White/White_80 */
					border: 1px solid #c6c6c6;
					border-radius: 4px;
					padding: 10px 0px;
					width: 100%;
				}
			}
		}

		.texto {
			width: 100%;
			text-align: center;
			p {
				font-weight: 400;
				font-size: 14px;
				line-height: 24px;
			}

			.link {
				color: #d30ed1;
			}
		}
	}
</style>
