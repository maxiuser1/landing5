<script lang="ts">
	import { user, isLoggedIn } from '$lib/stores/userstore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from 'src/firebase';

	onAuthStateChanged(auth, (authUser) => {
		user.set(authUser);
		isLoggedIn.set(!!authUser);
	});
</script>

<slot />
