<script lang="ts">
	import { signInWithPopup, type User, createUserWithEmailAndPassword } from 'firebase/auth';
	import { applyAction, enhance } from '$app/forms';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { Facebook, Google } from '$lib/icons';
	import Arrow from '$lib/icons/Arrow.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import { Spinner } from '$lib/components/Shared/ui/Spinner';

	export let form: any;
	let mensaje = '';
	let posting = false;

	async function handleFormSubmit() {
		const fdata = new FormData(this);
		const username = fdata.get('correo')?.toString() ?? '';
		const password = fdata.get('password')?.toString() ?? '';
		posting = true;
		try {
			const createdUser = await createUserWithEmailAndPassword(auth, username, password);
			const guser = createdUser.user;

			const data = new FormData();

			data.append('provider', 'email');
			data.append('fbtoken', guser.uid);
			data.append('nombre', fdata.get('nombre')?.toString() ?? '');
			data.append('correo', fdata.get('correo')?.toString() ?? '');
			data.append('dni', fdata.get('dni')?.toString() ?? '');
			data.append('apellido', fdata.get('apellido')?.toString() ?? '');
			data.append('telefono', fdata.get('telefono')?.toString() ?? '');

			const response = await fetch(this.action, {
				method: 'POST',
				body: data
			});
			const result: ActionResult = await response.json();
			if (result.type === 'success') {
				await invalidateAll();
			}
			applyAction(result);
			posting = false;
		} catch (error: any) {
			posting = false;
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

<div class="registro">
	<a href="/login" class="btn-outline">
		<Arrow color="#D30ED1" left={true} />
		Volver al login
	</a>

	{#if mensaje}
		<div class="error">{mensaje}</div>
	{/if}

	<div class="form">
		<div class="titulo--suprayado">Registro</div>
		<form autocomplete="off" on:submit|preventDefault={handleFormSubmit}>
			<div class="formulario">
				<div class="form-group">
					<label for="nombres">Nombres</label>
					<input type="text" name="nombre" placeholder="Ejem. Jose Luis" />
				</div>

				<div class="form-group">
					<label for="apellidos">Apellidos</label>
					<input type="text" name="apellido" placeholder="Ejem. Quispe Huaman" />
				</div>

				<div class="form-group">
					<label for="dni">DNI</label>
					<input type="text" name="dni" placeholder="0000000" />
				</div>

				<div class="form-group">
					<label for="correo">Email</label>
					<input type="email" name="correo" placeholder="Ejem. usuario@mai.com" />
				</div>

				<div class="form-group">
					<label for="telefono">Teléfono</label>
					<input type="text" name="telefono" placeholder="00000000" />
				</div>

				<div class="form-group">
					<label for="password">Contraseña</label>
					<input type="password" name="password" placeholder="*****" />
				</div>

				<div class="form-group">
					<label for="password">Confirmar Contraseña</label>
					<input type="password" name="repassword" placeholder="*****" />
				</div>
			</div>
			<div>
				<button class="btn" type="submit" disabled={posting}>
					{#if posting}
						<Spinner size="20" color="#D30ED1" unit="px" />
					{:else}
						Registrarse <Arrow color="white" />
					{/if}
				</button>
			</div>
		</form>

		<div class="texto">
			<p />
		</div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';

	.formulario {
		margin-top: 24px;
	}

	button[disabled='disabled'],
	button:disabled {
		background: #d30ed038 !important;
	}

	.titulo--suprayado {
		margin-top: 40px;
		font-size: 32px;
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
	.error {
		margin-top: 10px;
		color: red;
	}
</style>
