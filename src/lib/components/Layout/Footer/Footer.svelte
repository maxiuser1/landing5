<script>
	import Logo from '../Header/Logo.svelte';
import Socials from './Socials.svelte';
</script>

<section class="footer">
	<div class="container">
		<div>
			<Logo size={'25px'}></Logo>

			<ul class="links">
				<li><a href="/contenido/acerca-de-nosotros">Acerca de nosotros</a></li>
				<li><a href="/contenido/terminos_y_condiciones">Términos y condiciones</a></li>
				<li><a href="/contenido/politicas-de-privacidad">Políticas de privacidad</a></li>
				<li><a href="/contenido/politicas-de-cookies">Políticas de Cookies</a></li>
				<li><a href="/contenido/contacto">Contacto</a></li>
			</ul>
		</div>
		<div />
		<div>
			<h1>&nbsp;</h1>

			<h1>Sigue a Que Hay</h1>
			<Socials />
			<div class="libro">
				<a href="/contenido/libro-de-reclamaciones">
					<img
						src="https://res.cloudinary.com/maxitech/image/upload/v1665546173/ticketera/assets/libro_mlxv6e.png"
						alt="libro"
					/>
				</a>
			</div>
		</div>
	</div>
</section>
<section class="infrafooter">
	<div class="container">
		<div class="derechos">Derechos reservados © 2022, Que Hay</div>
	</div>
</section>

<style lang="scss">
	.derechos{
		font-size: 12px;
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
			font-size: 14px;
			line-height: 22px;
			margin-bottom: 24px;
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
		text-align: left;
	}
</style>
