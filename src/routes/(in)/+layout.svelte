<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Layout/Footer/Footer.svelte';
	import Autenticable from '$lib/components/Layout/Header/Autenticable.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import Logo from '$lib/components/Layout/Header/Logo.svelte';
	import { Arrow } from '$lib/icons';

	let { children } = $props();
	const volver = () => goto('/');
</script>

<Header {volver} />
<main>{@render children()}</main>
<Footer />
