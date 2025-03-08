<script lang="ts">
	import { page } from '$app/state';
	import { Google } from '$lib/icons';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { auth } from '../../../firebase';
	import { invalidateAll } from '$app/navigation';
	import { applyAction } from '$app/forms';
	async function handleGoogleClick(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
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

<div>
	<div class="socials">
		<form method="POST" onsubmit={handleGoogleClick}>
			<button class="btn-social" type="submit"> <Google /> </button>
		</form>
	</div>
</div>

<style lang="scss">
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
