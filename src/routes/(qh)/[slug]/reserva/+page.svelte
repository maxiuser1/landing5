<script lang="ts">
	import { goto } from '$app/navigation';
	import Banner from '$lib/components/Evento/Reserva/Banner.svelte';
	import Zonas from '$lib/components/Evento/Reserva/Zonas.svelte';
	import Header from '$lib/components/Layout/Header/Header.svelte';

	let { data } = $props();
	const { evento }: { evento: App.Evento } = data;

	function volver() {
		goto(`/${evento.id}`);
	}
</script>

<Header {volver}></Header>
<Banner banner={evento.caratula.banner} />

<section class="minicontainer">
	<Zonas {evento} />
</section>

<style lang="scss">
	@use '../../../../../static/style.scss' as mixin;

	.minicontainer {
		margin: 0 auto;
		width: 100%;
		padding-right: 16px;
		padding-left: 16px;
		background-color: #f9f9f9;
		padding-bottom: 48px;
		@include mixin.breakpoint(mixin.$md) {
			padding-top: 40px;
			padding-right: 32px;
			padding-left: 32px;
			max-width: 728px;
			border-top-left-radius: 8px;
			border-top-right-radius: 8px;
		}
	}
</style>
