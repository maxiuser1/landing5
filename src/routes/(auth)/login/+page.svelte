<script lang="ts">
	import { page } from '$app/state';
	import { Arrow, Google } from '$lib/icons';
	import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { applyAction } from '$app/forms';
	import { onMount } from 'svelte';

	let userError = $state('');
	let passError = $state('');
	onAuthStateChanged(auth, async (user) => {
		if (user) {
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

	async function handleGoogleClick(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		event.preventDefault();
		const data = new FormData();
		const provider = new GoogleAuthProvider();
		const res = await signInWithPopup(auth, provider);
		const guser = res.user;
		data.append('provider', 'google');
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
	}
</script>

<div class="login">
	<form method="POST" action="?/login" class="mt-20">
		<div class="form mt-20">
			<h1 class="titulo--suprayado">Bienvenido</h1>
			<div class="form-group">
				<label for="username">Usuario</label>
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

	<div class="socials">
		<form method="POST" onsubmit={handleGoogleClick}>
			<button class="btn-social" type="submit"> <Google /> </button>
		</form>
	</div>
</div>

<style lang="scss">
	@use '$lib/scss/form' as form;

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

	.login {
		margin: 0 auto;
		max-width: 95wh;
		padding-top: 12px;
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
				border: 1px solid #c6c6c6;
				border-radius: 4px;
				padding: 10px 0px;
				width: 100%;
			}
		}
	}
</style>
