<script lang="ts">
	import { Plus, Trash } from '$lib/icons';

	export let monto = 0;
	let otros: Array<{ c: string; v: number | null }> = [];

	function onclick() {
		otros = [...otros, { c: '', v: null }];
	}

	const deletePago = function (index: number) {
		otros.splice(index, 1);
		otros = otros;
	};
</script>

<div class="bi-form-group">
	<div class="lside">
		<input type="text" placeholder="Valor" name="submonto" value={monto} />
	</div>
	<div class="rside">
		<select name="formaPago" class="form-control" required>
			<option value="">Forma pago</option>
			<option value="Efectivo">Efectivo</option>
			<option value="Debido">Tarjeta débito</option>
			<option value="Credito">Tarjeta crédito</option>
			<option value="Foranea">Tarjeta foránea</option>
			<option value="Plin">Plin</option>
			<option value="Yape">Yape</option>
			<option value="Transferencia">Transferencia</option>
		</select>
	</div>
</div>
{#each otros as otro, index}
	<div class="bi-form-group">
		<div class="lside">
			<input type="text" placeholder="Valor" name="submonto_{index}" bind:value={otro.v} />
		</div>
		<div class="rside">
			<select name="formaPago_{index}" class="form-control" bind:value={otro.c} required>
				<option value="">Forma pago</option>
				<option value="Efectivo">Efectivo</option>
				<option value="Debido">Tarjeta débito</option>
				<option value="Credito">Tarjeta crédito</option>
				<option value="Foranea">Tarjeta foránea</option>
				<option value="Plin">Plin</option>
				<option value="Yape">Yape</option>
				<option value="Transferencia">Transferencia</option>
			</select>
		</div>
		<div>
			<button type="button" on:click={() => deletePago(index)}><Trash /></button>
		</div>
	</div>
{/each}
<div class="botonera">
	<button type="button" on:click={onclick}>
		<Plus />
	</button>
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;
	button {
		padding: 4px 6px;
		background: transparent;
		border-radius: 4px;
		border: 1px solid #d30ed1;
		color: #d30ed1;
	}
	.botonera {
		padding-left: 24px;
	}
	.bi-form-group {
		min-width: 100%;
		width: 100%;
		padding-left: 24px;
		padding-right: 24px;
		display: flex;
		flex-direction: row;

		.lside {
			width: 30%;
		}
		.rside {
			width: 70%;
		}

		select {
			width: 100%;
		}

		input {
			min-width: 100%;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}
	}
</style>
