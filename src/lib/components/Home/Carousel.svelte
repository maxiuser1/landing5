<script lang="ts">
	let { eventos = [] }: { eventos: App.Evento[] } = $props();
</script>

{#each eventos as evento, idx}
	<div class="item">
		<h1>{evento.nombre}</h1>
	</div>
{/each}
