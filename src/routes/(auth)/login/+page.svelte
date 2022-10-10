<script lang="ts">
	import {
		signInWithPopup,
		GoogleAuthProvider,
		signInWithEmailAndPassword,
		type User,
		FacebookAuthProvider
	} from 'firebase/auth';
	import { enhance } from '$app/forms';
	import { auth } from '../../../firebase';
	import { json } from '@sveltejs/kit';
	/** @type {import('./$types').ActionData} */
	export let form: any;

	async function handleGoogleClick() {
		const data = new FormData();
		const provider = new GoogleAuthProvider();
		const res = await signInWithPopup(auth, provider);
		const guser = res.user;
		data.append('provider', 'google');
		data.append('token', 'asd');
		const response = await fetch('/login', {
			method: 'POST',
			body: data
		});
	}

	async function handleFacebookClick() {}
</script>

<div class="form">
	<form method="POST" use:enhance>
		<input name="email" type="email" required />
		<!-- {#if form?.missing}<p class="error">The email field is required</p>{/if}
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if} -->
		<input name="password" type="password" required />
		<button>Log in</button>
	</form>

	<div class="socials">
		<button class="btn-social" type="button" on:click={handleGoogleClick}> Google </button>
		<button class="btn-social" type="button" on:click={handleFacebookClick}> Facebook </button>
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
		.btn-social {
			background: #ffffff;
			/* White/White_80 */
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			padding: 10px 0px;
			width: 100%;
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
