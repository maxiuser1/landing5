<script lang="ts">
	import type { PageData, Errors } from './$types';

	export let data: PageData;
	let { eventos } = data;
	console.log('data', data);
</script>

<div>
	<ul>
		{#each eventos as evento}
			<li>{evento.nombre}</li>
		{/each}
	</ul>
</div>
