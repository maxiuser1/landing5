<script lang="ts">
	import Barinputer from '$lib/components/Evento/Barinputer.svelte';
	import { onMount } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	let html5Qrcode: any;
	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
	}
</script>

<section class="container">
	<div>
		<form method="POST">
			<Barinputer name="jose" {html5Qrcode} />
		</form>
	</div>
</section>

<style lang="scss">
	.container {
		margin-top: 50px;
		margin-bottom: 50px;
	}
</style>
