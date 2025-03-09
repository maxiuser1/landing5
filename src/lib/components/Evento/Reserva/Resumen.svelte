<script lang="ts">
	import Trash from '$lib/icons/Trash.svelte';
	import { soles } from '$lib/shared/formatos';

	let { evento, reserva } = $props();
</script>

<h4>Resumen</h4>
{#each reserva.reservadas as compra, idx}
	<div class="compra" class:compra--odd={idx % 2 == 0}>
		<h6>{compra.nombre}</h6>
		<div class="botonera">
			<div>
				{soles(compra.total)}
			</div>
			<button onclick={() => reserva.del(compra)} class="button--icon">
				<Trash />
			</button>
		</div>
	</div>
{/each}

{reserva.total}

<style lang="scss">
	.compra {
		display: flex;
		justify-content: space-between;
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
	}
</style>
