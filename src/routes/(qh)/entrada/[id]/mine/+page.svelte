<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Layout/Header/Header.svelte';
	import { formatDate } from '$lib/shared/formatos';

	let { data } = $props();

	let validoHasta = $state(Date.now());

	const { entrada, evento, qrcode } = data;

	const volver = () => goto('./');
	let count = $state(4);

	$effect(() => {
		const interval = setInterval(() => {
			if (count === 1) {
				clearInterval(interval);
				volver();
			}
			count--;
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function formatTime(seconds: number) {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	}
</script>

<Header {volver}></Header>

<section class="principal">
	<h1>{evento.general.nombre}</h1>
	<div class="alcentro">
		<strong>{evento.ubicacion.nombre} </strong>
		<div>{formatDate(new Date(evento.fechas.fechaUnica))}</div>
	</div>
</section>

<div class="minicontainer centrado mt-40 mb-40">
	<img src={qrcode} alt="QR" />
</div>
<div class="minicontainer centrado">
	<p>QR válido por: {formatTime(count)} minutos</p>
</div>

<style lang="scss">
	.principal {
		margin-top: 99px;
		margin-bottom: 32px;
		text-align: center;
	}
</style>
