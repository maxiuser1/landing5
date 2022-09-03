<script>
	export let data;
	let { eventos } = data;
</script>

<div>
	<ul>
		{#each eventos as evento}
			<li>{evento.nombre}</li>
		{/each}
	</ul>
</div>
