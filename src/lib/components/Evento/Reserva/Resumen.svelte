<script lang="ts">
	import Trash from '$lib/icons/Trash.svelte';
	import { soles } from '$lib/shared/formatos';

	let { evento, reserva } = $props();
</script>

<h4>Resumen</h4>
{#each reserva.reservadas as compra, idx}
	<div class="compra" class:compra--odd={idx % 2 == 0}>
		<h6>{compra.nombre}</h6>
		<div class="precio">
			{soles(compra.total)}
		</div>
		<div class="botonera">
			<button onclick={() => reserva.del(compra)} class="button--icon">
				<Trash />
			</button>
		</div>
	</div>
{/each}
<div class="compra">
	<div></div>
	<div class="precio">Total: <strong>{soles(reserva.total)}</strong></div>
	<div></div>
</div>

<style lang="scss">
	.precio {
		text-align: right;
	}
	.compra {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		align-items: center;
		padding: 18px 32px;

		&--odd {
			background-color: #fff;
			border-radius: 8px;
		}
	}

	.botonera {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
