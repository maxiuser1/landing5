<script>
	import { Deathbox } from '$lib/icons';
</script>

<div class="legend">
	<div class="box">
		<div class="line">
			<Deathbox disabled={true} width={60} />
			<div>
				<strong>Ocupado</strong>
			</div>
		</div>
		<div class="line">
			<Deathbox disabled={false} width={60} />
			<div>
				<strong>Box libre</strong>
			</div>
		</div>

		<div class="line">
			<Deathbox disabled={false} tomados={7} width={60} />
			<div>
				<strong>Box con 3 puestos libres</strong>
			</div>
		</div>

		<div class="line">
			<Deathbox disabled={false} width={60} tomado={true} />
			<div>
				<strong>Seleccionado</strong>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.legend {
		margin-top: 48px;
		padding: 0 24px;
		.box {
			padding: 16px 32px;
			min-width: 191px;
			border: 1px solid #e2e2e2;
			border-radius: 8px;
			margin: 0 auto;
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 20px 5px;
		}

		.line {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 8px;

			font-weight: 500;
			font-size: 14px;
			line-height: 16px;
		}
	}
</style>
