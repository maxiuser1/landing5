<script lang="ts">
	export let data: any;
	export let form: any;
</script>

<section class="container exitoso">
	{#if form.ok}
		<div class="icon">
			<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					opacity="0.1"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180ZM90 151C123.689 151 151 123.689 151 90C151 56.3106 123.689 29 90 29C56.3106 29 29 56.3106 29 90C29 123.689 56.3106 151 90 151Z"
					fill="url(#paint0_linear_352_98)"
				/>
				<path
					d="M89.9994 16.6667C75.4954 16.6667 61.3172 20.9676 49.2576 29.0256C37.198 37.0835 27.7986 48.5366 22.2482 61.9366C16.6978 75.3365 15.2455 90.0814 18.0751 104.307C20.9047 118.532 27.889 131.599 38.1449 141.855C48.4007 152.11 61.4675 159.095 75.6928 161.924C89.918 164.754 104.663 163.302 118.063 157.751C131.463 152.201 142.916 142.801 150.974 130.742C159.032 118.682 163.333 104.504 163.333 90C163.333 70.5508 155.607 51.8982 141.854 38.1455C128.101 24.3928 109.449 16.6667 89.9994 16.6667ZM128.046 74.7133L81.3794 121.38C80.1292 122.63 78.4338 123.332 76.6661 123.332C74.8983 123.332 73.2029 122.63 71.9527 121.38L51.9527 101.38C50.7383 100.123 50.0664 98.4387 50.0816 96.6907C50.0967 94.9427 50.7979 93.2706 52.0339 92.0346C53.27 90.7985 54.9421 90.0974 56.69 90.0822C58.438 90.067 60.122 90.739 61.3794 91.9533L76.6661 107.24L118.619 65.2867C119.877 64.0723 121.561 63.4003 123.309 63.4155C125.057 63.4307 126.729 64.1318 127.965 65.3679C129.201 66.6039 129.902 68.276 129.917 70.024C129.932 71.772 129.26 73.456 128.046 74.7133Z"
					fill="url(#paint1_linear_352_98)"
				/>
				<defs>
					<linearGradient id="paint0_linear_352_98" x1="90" y1="0" x2="90" y2="180" gradientUnits="userSpaceOnUse">
						<stop stop-color="#FF0036" />
						<stop offset="1" stop-color="#D30ED1" />
					</linearGradient>
					<linearGradient id="paint1_linear_352_98" x1="89.9994" y1="16.6667" x2="89.9994" y2="163.333" gradientUnits="userSpaceOnUse">
						<stop stop-color="#FF0036" />
						<stop offset="1" stop-color="#D30ED1" />
					</linearGradient>
				</defs>
			</svg>
		</div>
		<div class="pago">
			<h1>Pago Exitoso</h1>
			<h2>Lugar reservado</h2>
			<ul>
				<li>
					N° orden: {form.purchaseNumber}
				</li>
				<li>Tarjeta: {form.CARD}</li>
				<li>Detalle: {form.ACTION_DESCRIPTION}</li>
				<li>Fecha: {form.TRANSACTION_DATE}</li>
			</ul>
		</div>
		<div class="ctas">
			<button type="button" class="imprimir">Imprimir constancia</button>
			<button type="button" class="enviar">Enviar al correo</button>
		</div>
	{:else}
		<div class="icon">
			<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					opacity="0.1"
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180ZM90 151C123.689 151 151 123.689 151 90C151 56.3106 123.689 29 90 29C56.3106 29 29 56.3106 29 90C29 123.689 56.3106 151 90 151Z"
					fill="#525252"
				/>
				<path
					d="M49.2576 29.0249C61.3172 20.9669 75.4954 16.666 89.9994 16.666C109.449 16.666 128.101 24.3922 141.854 38.1449C155.607 51.8975 163.333 70.5501 163.333 89.9994C163.333 104.503 159.032 118.682 150.974 130.741C142.916 142.801 131.463 152.2 118.063 157.751C104.663 163.301 89.918 164.753 75.6928 161.924C61.4675 159.094 48.4007 152.11 38.1449 141.854C27.889 131.598 20.9047 118.531 18.0751 104.306C15.2455 90.0807 16.6978 75.3358 22.2482 61.9359C27.7986 48.536 37.198 37.0829 49.2576 29.0249Z"
					fill="#B9B9B9"
				/>
				<path d="M123 62.7479L116.252 56L89.5 82.7521L62.7479 56L56 62.7479L82.7521 89.5L56 116.252L62.7479 123L89.5 96.2479L116.252 123L123 116.252L96.2479 89.5L123 62.7479Z" fill="white" />
			</svg>
		</div>
		<div class="pago">
			<h1>Error en pago</h1>
			<ul>
				<li>
					N° orden: {form.purchaseNumber}
				</li>
				<li>Detalle: {form.ACTION_DESCRIPTION}</li>
			</ul>
		</div>
	{/if}
</section>

<style lang="scss">
	@import './static/style.scss';
	.exitoso {
		text-align: center;
		margin-top: 100px;
		width: 100%;
		.icon {
			width: 100%;
			margin: 0 auto;
		}

		.pago {
			h1 {
				font-weight: 900;
				font-size: 42px;
				line-height: 50px;
				color: #262626;
			}

			h2 {
				font-weight: 400;
				font-size: 32px;
				line-height: 38px;
				color: #262626;
			}

			p {
				margin-top: 16px;
				font-weight: 400;
				font-size: 18px;
				line-height: 22px;
			}
		}

		.ctas {
			margin-top: 48px;
			button {
				padding: 12px 16px;
			}
			.imprimir {
				border: 1px solid #d30ed1;
				color: #d30ed1;
				border-radius: 4px;
				background: transparent;
			}

			.enviar {
				padding: 12px 16px;
				background: linear-gradient(270deg, #ff0036 0%, #d30ed1 100%);
				border-radius: 4px;
				border: none;
				color: white;
			}
		}
	}
</style>
