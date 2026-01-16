<script lang="ts">
	import { page } from '$app/state';
	import { Impresora } from '$lib/icons';
	import Boton from '../Shared/ui/Boton.svelte';
	import Entradas from './Entradas.svelte';
	import Productos from './Productos.svelte';

	let { entradas, productos, imprimir, loading } = $props();
</script>

<section class="minicontainer">
	<Entradas {entradas} />
	<Productos {productos} />

	<div class="centrado mt-20 flexed">
		<Boton class="btn--outline" onclick={imprimir} {loading}>Asignar entradas</Boton>
		<a class="btn" href={page.url + '/mine'}>Mi QR de ingreso <Impresora /></a>
	</div>
</section>
