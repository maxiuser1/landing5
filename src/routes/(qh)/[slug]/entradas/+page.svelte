<script lang="ts">
	import { json } from '@sveltejs/kit';

	export let data;
	let { evento } = data;
</script>

<div>
	{JSON.stringify(evento)}
</div>
