<script lang="ts">
	import Entradas from './Entradas.svelte';
	import Productos from './Productos.svelte';

	let { entradas, productos } = $props();
</script>

<section class="minicontainer">
	<Entradas {entradas} />
	<Productos {productos} />
</section>
