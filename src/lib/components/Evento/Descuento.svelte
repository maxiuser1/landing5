<script lang="ts">
	import { Descuento } from '$lib/icons';

	export let descuento: string = '';
</script>

<div>
	<span>
		<Descuento />
	</span>
	{descuento}
</div>

<style lang="scss">
	@use './static/style.scss' as mixin;
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
