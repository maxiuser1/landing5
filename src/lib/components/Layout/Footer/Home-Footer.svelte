<script>
	import Logo from '../Header/Logo.svelte';
	import Socials from './Socials.svelte';
	const anio = new Date().getFullYear();
</script>

<section class="footer no-print">
	<div class="container container--foter">
		<div>
			<Logo size={'4.3rem'} />
		</div>
		<div>
			<ul class="links">
				<li><a href="/contenido/acerca-de-nosotros">Acerca de nosotros</a></li>
				<li><a href="/contenido/preguntas-frecuentes">Preguntas frecuentes</a></li>
				<li><a href="/contenido/terminos_y_condiciones">Términos y condiciones</a></li>
				<li><a href="/contenido/politicas-de-privacidad">Políticas de privacidad</a></li>
				<li><a href="/contenido/politicas-de-cookies">Políticas de Cookies</a></li>
				<li><a href="/contenido/contacto">Contacto</a></li>
			</ul>
		</div>
		<div>
			<h1 class="sigue">Sigue a QueHay</h1>
			<Socials />
			<div class="libro">
				<a href="/contenido/libro-de-reclamaciones">
					<img src="https://i.postimg.cc/HLTtb0cw/image-7.png" alt="libro" />
				</a>
			</div>
		</div>
	</div>
</section>

<section class="infrafooter">
	<div class="container">
		<div class="derechos">
			Derechos reservados © {anio}, Que Hay
		</div>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';
	.derechos {
		font-size: 16px;
		@include breakpoint($md) {
			font-size: 12px;
		}
	}
	.infrafooter {
		padding: 24px 0;
		background-color: #090909;
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
		background-color: #1b1b1b;
	}

	.container--foter {
		display: flex;
		flex-flow: row wrap;
		flex-direction: column;
		text-align: center;

		@include breakpoint($md) {
			text-align: initial;
			flex-direction: row;
			justify-content: space-between;
		}

		.sigue {
			margin-top: 40px;
		}

		h1 {
			line-height: 22px;
			margin-bottom: 24px;
			font-size: 18px;
			font-weight: normal;

			@include breakpoint($md) {
				font-size: 14px;
			}
		}

		ul.links {
			margin-top: 20px;
			padding-inline-start: 0px;

			li {
				font-weight: 400;
				padding-bottom: 10px;
				font-size: 16px;
				line-height: 19px;

				a {
					color: #ffebff;
					font-size: 12px;
				}
			}
		}
	}

	.libro {
		margin-top: 20px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
