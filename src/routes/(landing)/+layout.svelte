<script lang="ts">
	import HomeHeader from '$lib/components/Layout/Header/Home-Header.svelte';

	let { children } = $props();
</script>

<HomeHeader></HomeHeader>
{@render children()}

<p>jose</p>
