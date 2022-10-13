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

	export let form: any;

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
			alert(error.message);
		}
	}

	async function handleFacebookClick() {}
</script>

<div class="form">
	<a href="/login" class="titulo">Bienvenido</a>
	<form autocomplete="off" on:submit|preventDefault={handleFormSubmit}>
		<div>
			<div class="usuario">
				<label for="username">Usuario</label>
				<input type="text" name="username" required />
			</div>

			<div class="contrasena">
				<label for="password">Contraseña</label>
				<input type="password" name="password" required />
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

<style lang="scss">
	input[type='number'] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input {
		width: 100%;
		padding: 0 12px;
		border: 1px solid #c6c6c6;
		border-radius: 4px;
		background: #ffffff;
		height: 42px;
	}
	input:focus {
		outline: none;
	}

	label {
		font-weight: 600;
		font-size: 14px;
		line-height: 24px;
	}

	.usuario {
		margin-top: 24px;
	}

	.contrasena {
		margin-top: 32px;
	}

	.btn {
		margin-top: 34px;
		margin-bottom: 24px;
		width: 100%;
	}

	.error {
		margin-top: 10px;
		color: red;
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

	.titulo {
		color: #d30ed1;
		font-weight: 700;
		font-size: 30px;
		line-height: 36px;
		border-bottom: 2px solid #d30ed1;
	}

	.recordar {
		label {
			font-weight: 400;
			font-size: 14px;
			line-height: 20px;
		}
	}

	.form {
		margin-top: 42px;

		.btn {
			width: 100%;
		}
	}

	.controls {
		margin-top: 32px;
		margin-bottom: 32px;

		.usuario {
			margin-bottom: 20px;
		}

		input {
			width: 100%;
			padding: 6px 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}
	}
</style>
