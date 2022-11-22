<script lang="ts">
	import { signInWithPopup, GoogleAuthProvider, type User, FacebookAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
	import { applyAction, enhance } from '$app/forms';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { Facebook, Google } from '$lib/icons';
	import { z } from 'zod';
	import { page } from '$app/stores';

	let mensaje = '';

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
				mensaje = 'Credenciales no válidas';
			}

			if (error.code == 'auth/user-not-found') {
				mensaje = 'La cuenta ingresada no existe';
			}

			if (error.code == 'auth/user-disabled') {
				mensaje = 'La cuenta no está habilitada';
			}

			if (error.code == 'auth/invalid-email') {
				mensaje = 'Cuenta no vàlida';
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
		<a href="/login" class="titulo--subrayado">Bienvenido</a>
		{#if mensaje}
			<div class="error">{mensaje}</div>
		{/if}

		<form autocomplete="off" on:submit|preventDefault={handleFormSubmit}>
			<div class="form-group">
				<label for="username">Usuario</label>
				<input type="text" name="username" />
			</div>

			<div class="form-group">
				<label for="password">Contraseña</label>
				<input type="password" name="password" />
				<div class="olvidaste">
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
	.error {
		margin-top: 10px;
		color: red;
	}
	.login {
		margin: 0 auto;
		max-width: 380px;
		padding-top: 12px;
	}
	.form {
		margin-top: 14px;

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
	// input {
	// 	width: 92%;
	// 	padding: 0 12px;
	// 	border: 1px solid #c6c6c6;
	// 	border-radius: 4px;
	// 	background: #ffffff;
	// 	height: 42px;
	// }
	// input:focus {
	// 	outline: none;
	// }

	// label {
	// 	font-weight: 600;
	// 	font-size: 14px;
	// 	line-height: 24px;
	// }

	// .usuario {
	// 	margin-top: 24px;
	// }

	// .contrasena {
	// 	margin-top: 32px;
	// }

	// .btn {
	// 	margin-top: 34px;
	// 	margin-bottom: 24px;
	// 	width: 100%;
	// }

	// .error {
	// 	margin-top: 10px;
	// 	color: red;
	// }

	// .titulo {
	// 	color: #d30ed1;
	// 	font-weight: 700;
	// 	font-size: 30px;
	// 	line-height: 36px;
	// 	border-bottom: 2px solid #d30ed1;
	// }

	// .recordar {
	// 	label {
	// 		font-weight: 400;
	// 		font-size: 14px;
	// 		line-height: 20px;
	// 	}
	// }

	// .form {
	// 	margin-top: 42px;

	// 	.btn {
	// 		width: 100%;
	// 	}
	// }

	// .controls {
	// 	margin-top: 32px;
	// 	margin-bottom: 32px;

	// 	.usuario {
	// 		margin-bottom: 20px;
	// 	}

	// 	input {
	// 		width: 100%;
	// 		padding: 6px 12px;
	// 		border: 1px solid #c6c6c6;
	// 		border-radius: 4px;
	// 		background: #ffffff;
	// 		height: 42px;
	// 	}
	// }
</style>
