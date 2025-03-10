<script lang="ts">
	let { numero, disabled = false, width, tomados = 2, tomado = false, limite = 10, clicked } = $$props;

	function evaluar(indice: number) {
		if (indice >= tomados) return 'blue';
		return tomado ? '#ff5260' : '#D4D4D4';
	}

	function handleClick() {
		tomado = !tomado;
		clicked(tomado);
	}
</script>

{#if disabled}
	<svg viewBox="0 0 112 60" class="ocupado" {width} xmlns="http://www.w3.org/2000/svg">
		<g class="layer">
			<rect height="8" id="svg_2" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="15.44" y="51" />
			<rect height="8" id="svg_8" rx="4" width="22.75" x="44.75" y="51" />
			<rect height="8" id="svg_9" rx="4" width="22.75" x="73.75" y="51" />
			<rect height="8" id="svg_10" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="15.44" y="0.75" />
			<rect height="8" id="svg_11" rx="4" transform="matrix(1 0 0 1 0 0)" width="22.75" x="44.75" y="0.63" />
			<rect height="8" id="svg_12" rx="4" width="22.75" x="73.75" y="0.38" />
			<rect
				height="8"
				id="svg_13"
				rx="4"
				transform="matrix(0 -0.703351 1 0 81.875 91.6459)"
				width="22.75"
				x="65.43"
				y="-79.63"
			/>
			<rect
				height="8"
				id="svg_17"
				rx="4"
				transform="matrix(0 -0.643713 1 0 81.875 86.642)"
				width="22.75"
				x="92.62"
				y="-79.75"
			/>
			<rect
				height="8"
				id="svg_18"
				rx="4"
				transform="matrix(0 -0.703351 1 0 81.875 91.6459)"
				width="22.75"
				x="65.43"
				y="20.44"
			/>
			<rect
				height="8"
				id="svg_19"
				rx="4"
				transform="matrix(0 -0.703351 1 0 81.875 91.6459)"
				width="22.75"
				x="89.95"
				y="20.56"
			/>
			<rect height="36" id="svg_20" rx="4" width="81.62" x="15.44" y="11.63" />
		</g>
	</svg>
{:else}
	<button onclick={handleClick} type="button" class="box">
		<svg viewBox="0 0 112 60" {width} xmlns="http://www.w3.org/2000/svg" class={tomado ? 'tomado' : 'vacio'}>
			<g class="layer">
				<rect
					height="8"
					id="s1"
					rx="4"
					class:sentado={tomados > 0}
					transform="matrix(1 0 0 1 0 0)"
					width="22.75"
					x="15.44"
					y="0.75"
				/>
				{#if limite >= 2}
					<rect
						height="8"
						id="s2"
						rx="4"
						class:sentado={tomados > 1}
						transform="matrix(1 0 0 1 0 0)"
						width="22.75"
						x="44.75"
						y="0.63"
					/>
				{/if}
				{#if limite >= 3}
					<rect height="8" id="s3" rx="4" class:sentado={tomados > 2} width="22.75" x="73.75" y="0.38" />
				{/if}

				{#if limite >= 4}
					<rect
						height="8"
						id="s4"
						rx="4"
						class:sentado={tomados > 3}
						transform="matrix(0 -0.643713 1 0 81.875 86.642)"
						width="22.75"
						x="92.62"
						y="-79.75"
					/>
				{/if}

				{#if limite >= 5}
					<rect
						height="8"
						id="s5"
						rx="4"
						class:sentado={tomados > 4}
						transform="matrix(0 -0.703351 1 0 81.875 91.6459)"
						width="22.75"
						x="89.95"
						y="20.56"
					/>
				{/if}

				{#if limite >= 6}
					<rect
						height="8"
						id="s6"
						rx="4"
						class:sentado={tomados > 5}
						transform="matrix(0 -0.703351 1 0 81.875 91.6459)"
						width="22.75"
						x="65.43"
						y="-79.63"
					/>
				{/if}

				{#if limite >= 7}
					<rect
						height="8"
						id="s7"
						rx="4"
						class:sentado={tomados > 6}
						transform="matrix(0 -0.703351 1 0 81.875 91.6459)"
						width="22.75"
						x="65.43"
						y="20.44"
					/>
				{/if}

				{#if limite >= 8}
					<rect
						height="8"
						id="s8"
						rx="4"
						class:sentado={tomados > 7}
						transform="matrix(1 0 0 1 0 0)"
						width="22.75"
						x="15.44"
						y="51"
					/>
				{/if}

				{#if limite >= 9}
					<rect height="8" id="s9" rx="4" class:sentado={tomados > 8} width="22.75" x="44.75" y="51" />
				{/if}

				{#if limite >= 10}
					<rect height="8" id="s10" rx="4" class:sentado={9 < tomados} width="22.75" x="73.75" y="51" />
				{/if}

				<rect height="36" id="mesa" rx="4" width="81.62" x="15.44" y="11.63" />
				<text x="56.25" y="29.63" fill="black" font-size="16" text-anchor="middle" dominant-baseline="middle">
					{numero}
				</text>
			</g>
		</svg>
	</button>
{/if}

<style lang="scss">
	@use '../../../static/style.scss' as mixin;
	.ocupado rect {
		fill: #d4d4d4;
	}

	.vacio rect {
		fill: none;
		stroke: #d4d4d4;
		stroke-width: 2;
	}

	rect.sentado {
		fill: #d4d4d4;
	}

	.tomado rect {
		fill: #ff888f;
	}

	.box:hover rect {
		@include mixin.breakpoint(mixin.$md) {
			fill: #ff888f;
			stroke: none;
			pointer-events: all;
		}
	}

	.box {
		background: none;
		border: none;
	}
</style>
