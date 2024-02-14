<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let numero: number;
	export let tomado = false;
	export let disabled = false;
	// let height: number = width * 0.7;

	const dispatch = createEventDispatcher();
	function handleClick() {
		if (!disabled) {
			tomado = !tomado;
			dispatch('clickeado', { state: tomado });
		}
	}
</script>

<button on:click={handleClick} type="button" class="caja" class:caja--disabled={disabled} class:caja--tomado={tomado}>{numero}</button>

<style lang="scss">
	@import './static/style.scss';

	.caja {
		border: none;
		width: 24px;
		height: 24px;
		color: white;
		background-color: #bf0026;

		&:hover {
			background-color: #f70031;
		}

		&--tomado {
			background-color: #000;
			&:hover {
				background-color: #000;
			}
		}

		&--disabled {
			background-color: #9e9e9e;
			&:hover {
				background-color: #9e9e9e;
			}
		}
	}
</style>
