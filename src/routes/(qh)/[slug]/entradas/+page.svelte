<script lang="ts">
	import { Breadcrumbs, Steps } from '$lib/components/Evento';
	import Zonas from '$lib/components/Evento/Zonas.svelte';

	export let data;
	let { evento } = data;
</script>

<Breadcrumbs {evento} />
<Steps paso={1} />
<Zonas {evento} />
