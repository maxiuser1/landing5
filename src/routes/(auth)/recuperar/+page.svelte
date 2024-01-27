<script lang="ts">
	import { signInWithPopup, GoogleAuthProvider, type User, FacebookAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
	import { applyAction, enhance } from '$app/forms';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { Facebook, Google } from '$lib/icons';
	import Arrow from '$lib/icons/Arrow.svelte';

	export let form: any;
	let mensaje = '';
	async function handleFormSubmit() {
		const fdata = new FormData(this);
		const email = fdata.get('email')?.toString() ?? '';

		try {
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

<div class="registro">
	<a href="/login" class="btn-outline">
		<Arrow color="#D30ED1" left={true} />
		Volver al login
	</a>
	<div class="form">
		<div class="titulo--suprayado">Ingresa tu correo</div>
		<p>Ingresa tu correo y te enviaremos instrucciones para reiniciar tu contraseña</p>
		{#if mensaje}
			<div class="error">{mensaje}</div>
		{/if}
		<br />
		<form autocomplete="off" on:submit|preventDefault={handleFormSubmit}>
			<div>
				<div class="form-group">
					<label for="email">Correo electrónico</label>
					<input type="email" name="email" required />
				</div>
			</div>
			<div>
				<button class="btn" type="submit">Enviar instrucciones <Arrow color="white" /> </button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';

	.titulo--suprayado {
		margin-top: 40px;
		font-size: 32px;
		margin-bottom: 15px;
	}

	.error {
		margin-top: 10px;
		color: red;
	}
	.registro {
		margin: 0 auto;
		max-width: 380px;
		padding-top: 42px;
	}
	.form {
		margin-top: 24px;

		.titulo {
			font-weight: 900;
			font-size: 24px;
			line-height: 29px;
			margin-bottom: 24px;
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
			margin-bottom: 32px;
			padding-left: initial;
			padding-right: initial;
		}

		.btn {
			width: 100%;
			font-weight: 600;
			font-size: 16px;
			line-height: 24px;
		}
	}
	// input[type='number'] {
	// 	-moz-appearance: textfield;
	// }

	// input::-webkit-outer-spin-button,
	// input::-webkit-inner-spin-button {
	// 	-webkit-appearance: none;
	// }

	// input:focus {
	// 	outline: none;
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
	// .socials {
	// 	margin-top: 24px;
	// 	margin-bottom: 24px;
	// 	display: flex;
	// 	gap: 10px;

	// 	form {
	// 		width: 100%;
	// 		.btn-social {
	// 			background: #ffffff;
	// 			/* White/White_80 */
	// 			border: 1px solid #c6c6c6;
	// 			border-radius: 4px;
	// 			padding: 10px 0px;
	// 			width: 100%;
	// 		}
	// 	}
	// }

	// .texto {
	// 	width: 100%;
	// 	text-align: center;
	// 	p {
	// 		font-weight: 400;
	// 		font-size: 14px;
	// 		line-height: 24px;
	// 	}

	// 	.link {
	// 		color: #d30ed1;
	// 	}
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
	// 	margin-top: 22px;

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
