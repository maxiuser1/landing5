<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { auth } from '../../../firebase';
	import { onMount } from 'svelte';

	onMount(async () => {
		signOut(auth).then(() => {
			document.location.href = '/';
		});
	});
</script>
