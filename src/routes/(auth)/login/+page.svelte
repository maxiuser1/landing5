<script lang="ts">
	import {
		signInWithPopup,
		GoogleAuthProvider,
		type User,
		FacebookAuthProvider,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { applyAction, enhance } from '$app/forms';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { Facebook, Google } from '$lib/icons';
	import { z } from 'zod';

	export let form: any;
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

		// const formData = Object.fromEntries(fdata);

		// const loginSchema = z.object({
		// 	username: z
		// 		.string({ required_error: 'Es necesario completar este campo' })
		// 		.min(1, { message: 'Es necesario completar este campo' }),
		// 	password: z
		// 		.string({ required_error: 'Es necesario completar este campo' })
		// 		.min(1, { message: 'Es necesario completar este campo' })
		// });

		// try {
		// 	const result = loginSchema.parse(formData);
		// 	console.log('success', result);
		// } catch (err: any) {
		// 	const { fieldErrors: errors } = err.flatten();
		// 	console.log(errors);
		// 	form = { ...form, errors };
		// }

		const username = fdata.get('username')?.toString() ?? '';
		const password = fdata.get('password')?.toString() ?? '';

		try {
			const res = await signInWithEmailAndPassword(auth, username, password);
			const guser = res.user;

			console.log('guser', guser);

			const data = new FormData();

			data.append('provider', 'google');
			data.append('token', guser.uid);
			data.append('displayName', guser.displayName ?? '');
			data.append('email', guser.email ?? '');
			data.append('photoURL', guser.photoURL ?? '');

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

	async function handleFacebookClick() {}
</script>

<div class="login">
	<div class="form">
		<a href="/login" class="titulo">Bienvenido</a>
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
		padding-top: 42px;
	}
	.form {
		margin-top: 24px;

		.titulo {
			text-decoration: none;
			position: relative;
			font-weight: 900;
			font-size: 32px;
			line-height: 38px;
			color: #d30ed1;
			&:after {
				position: absolute;
				content: '';
				bottom: -4px;

				margin: 0 auto;
				right: 0;
				width: 3px;
				height: 3px;
				border: 1px solid #d30ed1;
			}

			&:before {
				position: absolute;
				content: '';
				height: 5px;
				bottom: -4px;

				margin-right: auto;
				margin-left: 2px;
				left: 0;
				width: -webkit-calc(100% - 8px);
				width: -moz-calc(100% - 8px);
				width: calc(100% - 8px);
				background: #d30ed1;
			}
		}

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
