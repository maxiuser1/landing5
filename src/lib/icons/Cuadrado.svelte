<script lang="ts">
	let { numero, tomado = false, disabled = false, clicked } = $$props;
	function handleClick() {
		if (!disabled) {
			tomado = !tomado;
			clicked(tomado);
		}
	}
</script>

<button onclick={handleClick} type="button" class="caja" class:caja--disabled={disabled} class:caja--tomado={tomado}>
	{numero}
</button>

<style lang="scss">
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
