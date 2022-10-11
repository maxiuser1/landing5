<script lang="ts">
	import {
		signInWithPopup,
		GoogleAuthProvider,
		type User,
		FacebookAuthProvider
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

	async function handleFacebookClick() {}
</script>

<div class="form">
	<a href="/login" class="titulo">Bienvenido</a>
	<p>Puedes ingresar con tus cuentas de redes sociales.</p>

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
</div>

<style lang="scss">
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
		margin-top: 212px;

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
