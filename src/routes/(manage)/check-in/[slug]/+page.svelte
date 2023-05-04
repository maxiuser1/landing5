<script lang="ts">
	import QrScanner from '$lib/components/Evento/QrScanner.svelte';

	let scanning = false;
	let camara = false;

	function scanCanceld(event: any) {}
	function scanned(event: any) {}
</script>

<section>
	<div class="modal" style:visibility={camara ? 'visible' : 'hidden'}>
		<QrScanner on:detected={scanned} on:closed={scanCanceld} />
	</div>
</section>
