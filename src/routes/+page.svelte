<script>
	export let data;
	let { eventos } = data;
</script>

<div class="container">
	<h1>Titulo 2022</h1>
	<ul>
		{#each eventos as evento}
			<li>{evento.nombre}</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	div {
		color: red;
		li {
			color: yellow;
		}
	}
</style>
