<script lang="ts">
	import { Breadcrumbs, Steps } from '$lib/components/Evento';

	export let data;
	let { evento } = data;
</script>

<Breadcrumbs {evento} />
<Steps paso={2} />
