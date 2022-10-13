<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { auth } from '../../../firebase';
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log('rp');
		signOut(auth).then(() => {
			document.location.href = '/';
		});
	});
</script>
