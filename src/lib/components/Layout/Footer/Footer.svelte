<script>
	import Socials from './Socials.svelte';
</script>

<section class="footer">
	<div class="container">
		<div>
			<h1>¡Que Hay!</h1>
			<ul class="links">
				<li><a href="/contenido/politicas-de-privacidad">Políticas de privacidad</a></li>
				<li><a href="/contenido/terminos_y_condiciones">Términos y condiciones</a></li>
			</ul>
		</div>
		<div />
		<div>
			<h1>Sigue a Que Hay</h1>
			<Socials />
		</div>
	</div>
</section>
<section class="infrafooter">
	<div class="container">
		<div>Derechos reservados © 2022, Que Hay</div>
	</div>
</section>

<style lang="scss">
	section {
		padding-left: 24px;
		padding-right: 24px;
	}

	.infrafooter {
		padding: 24px 0;
		background-color: #5b025a;
		text-align: center;
		color: #ffebff;
		div {
			margin: 0 auto;
		}
	}
	.footer {
		padding-top: 20px;
		z-index: 3;
		padding-bottom: 20px;
		color: white;
		background-color: #80057f;
	}

	.container {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;

		h1 {
			font-weight: 700;
			font-size: 18px;
			line-height: 22px;
			margin-bottom: 24px;
		}

		ul.links {
			padding-inline-start: 0px;

			li {
				font-weight: 400;
				padding-bottom: 20px;
				font-size: 16px;
				line-height: 19px;

				a {
					color: #ffebff;
					font-size: 16px;
				}
			}
		}
	}
</style>
