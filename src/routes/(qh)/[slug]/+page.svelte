<script lang="ts">
	let { data } = $props();
	const { general } = data.evento;
</script>

<h1>{general.nombre}</h1>
