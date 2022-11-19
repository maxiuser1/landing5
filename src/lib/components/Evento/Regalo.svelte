<script lang="ts">
	import { Gift } from '$lib/icons';

	export let evento: App.Evento;
	export let entrada: App.Sentado;

	const regalo = evento.precios.find((t) => t.tipo == entrada.tipo);
</script>

{#if regalo?.regalo && entrada.cantidad > 0}
	<div>
		<span>
			<Gift />
		</span>
		{regalo?.regalo}
	</div>
{/if}

<style lang="scss">
	span {
		color: pink;
		margin-right: 10px;
	}
	div {
		flex-grow: 2;
		min-width: 100%;
		font-weight: 400;
		font-size: 12px;
		display: flex;
		align-items: center;
		color: #262626;
	}
</style>
