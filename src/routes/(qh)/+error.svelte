<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Layout/Header/Header.svelte';
</script>

<Header volver={() => goto('/')} />

<div class="container">
	<svg width="144" height="128" viewBox="0 0 144 128" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g id="Frame" opacity="0.5" clip-path="url(#clip0_2923_25154)">
			<g id="Group">
				<g id="Modo de aislamiento">
					<g id="Vector" style="mix-blend-mode:multiply" opacity="0.62">
						<path
							d="M72 127.999C111.765 127.999 144 126.076 144 123.703C144 121.331 111.765 119.408 72 119.408C32.2355 119.408 0 121.331 0 123.703C0 126.076 32.2355 127.999 72 127.999Z"
							fill="#80057F"
						/>
					</g>
					<g id="Group_2">
						<g id="Group_3">
							<path
								id="Vector_2"
								d="M1.76965 83.9199V98.6535C1.76965 100.066 2.92565 101.215 4.3314 101.215H139.676C141.089 101.215 142.237 100.066 142.237 98.6535V83.9199H1.76965Z"
								fill="#FFD6FE"
							/>
							<path
								id="Vector_3"
								d="M142.23 2.56143C142.23 1.15585 141.081 0 139.669 0H4.3314C2.92565 0 1.76965 1.14872 1.76965 2.56143V83.9206H142.237V2.56143H142.23Z"
								fill="#5B025A"
							/>
							<path id="Vector_4" d="M96.4543 101.215H48.1379V116.048H96.4543V101.215Z" fill="#FFD6FE" />
							<path id="Vector_5" d="M107.401 116.043H36.528V122.985H107.401V116.043Z" fill="#FFEBFF" />
							<path id="Vector_6" d="M96.4543 101.215H48.1379V106.573H96.4543V101.215Z" fill="#FEA9FD" />
							<path id="Vector_7" d="M134.995 7.30664H9.02673V76.4152H134.995V7.30664Z" fill="#FEA9FD" />
						</g>
						<g id="Group_4">
							<path
								id="Vector_8"
								d="M58.6489 20.8633L49.8862 29.6249L41.1163 20.8633L37.6127 24.3665L46.3754 33.1353L37.6127 41.897L41.1163 45.4073L49.8862 36.6385L58.6489 45.4073L62.1526 41.897L53.3899 33.1353L62.1526 24.3665L58.6489 20.8633Z"
								fill="#5B025A"
							/>
							<path
								id="Vector_9"
								d="M106.387 24.3665L102.884 20.8633L94.1138 29.6249L85.351 20.8633L81.8474 24.3665L90.6101 33.1353L81.8474 41.897L85.351 45.4073L94.1138 36.6385L102.884 45.4073L106.387 41.897L97.6246 33.1353L106.387 24.3665Z"
								fill="#5B025A"
							/>
						</g>
						<path
							id="Vector_10"
							d="M90.7813 66.8191C72.2283 54.0119 53.4398 66.6906 53.2543 66.8191L50.821 63.2944C51.0351 63.1446 72.264 48.8249 93.2146 63.2944L90.7813 66.8191Z"
							fill="#5B025A"
						/>
					</g>
				</g>
			</g>
		</g>
		<defs>
			<clipPath id="clip0_2923_25154">
				<rect width="144" height="128" fill="white" />
			</clipPath>
		</defs>
	</svg>

	<h1 class="mt-40">{page.error?.message}</h1>
</div>

<style lang="scss">
	@forward '../../../static/container.scss';

	.container {
		text-align: center;
		margin-top: 140px;
		margin-bottom: 140px;
	}
</style>
