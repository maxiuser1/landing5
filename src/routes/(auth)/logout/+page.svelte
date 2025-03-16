<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { auth } from '../../../firebase';

	onMount(() => {
		signOut(auth).then(() => {
			document.location.href = './';
		});
	});
</script>
