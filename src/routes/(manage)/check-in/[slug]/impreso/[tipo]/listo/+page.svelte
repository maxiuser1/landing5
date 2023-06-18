<script lang="ts">
	import { Greatcheck } from '$lib/icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="container summary">
	<Greatcheck />
	<br />
	<br />
	<h1>Check-in Listo!</h1>
	<br />
	<br />
	<br />

	<a href="https://quehay.pe/check-in/${data.slug}" class="btn volver">Volver</a>
</section>

<style lang="scss">
	@import './static/style.scss';

	.container {
		text-align: center;
		margin-top: 100px;
		margin-bottom: 500px;
	}
</style>
