<script lang="ts">
	import { Header } from '$lib/components/Layout';
	export let data;
	const { slug } = data;
</script>

<Header {slug} />
<main>
	<slot />
</main>
