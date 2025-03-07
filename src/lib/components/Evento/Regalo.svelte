<script lang="ts">
	import { Gift } from '$lib/icons';
	export let regalo: string = '';
</script>

<div>
	<span>
		<Gift />
	</span>
	{regalo}
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
