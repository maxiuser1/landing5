<script lang="ts">
	import { invalidateAll, goto } from '$app/navigation';
	import { applyAction, enhance } from '$app/forms';
	/** @type {import('./$types').ActionData} */
	export let form;
	$: console.log('form', form);
</script>

<form method="POST" use:enhance>
	<input name="email" type="email" required />
	<!-- {#if form?.missing}<p class="error">The email field is required</p>{/if}
	{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if} -->
	<input name="password" type="password" required />
	<button>Log in</button>
</form>
