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
	$: console.log('form', form);

	async function handleGoogleClick() {
		const data = new FormData();
		const provider = new GoogleAuthProvider();
		const res = await signInWithPopup(auth, provider);
		const guser = res.user;
		console.log('user', guser);
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
