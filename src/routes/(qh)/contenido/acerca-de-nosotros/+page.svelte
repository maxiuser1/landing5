<script lang="ts">
	import Vcarousel from '$lib/components/Home/Vcarousel.svelte';

	const banners: Array<App.Baneable> = [
		{
			banner:
				'https://res.cloudinary.com/maxitech/image/upload/v1666757182/ticketera/banners/a17ff271-51d4-4a82-b086-f556353eb97b.jpg'
		},
		{
			banner:
				'https://res.cloudinary.com/maxitech/image/upload/v1665596050/ticketera/banners/bzrpp_puqztv.jpg'
		}
	];
</script>

<section class="banner">
	<div class="content-banner">
		<video playsinline autoplay muted loop id="video">
			<source
				src="https://res.cloudinary.com/maxitech/video/upload/v1666842884/ticketera/banners/nosotros2_tvxtwx.webm"
				type="video/webm"
			/>
		</video>
	</div>
</section>

<section class="breacrumbs">
	<div class="container">
		<ul>
			<li>
				<a href="/">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#D30ED1" />
					</svg>
				</a>
			</li>
			<li class="selected">
				<a href="/"> Inicio </a>
			</li>
			<li>></li>
			<li>Acerca de nosotros</li>
		</ul>
	</div>
</section>

<section class="container">
	<div class="info ">
		<div>
			<h1>Nosotros</h1>
			<p>
				<span style="color:#d30ed1">Quehay.pe</span> nace con la iniciativa de difundir el arte y cultura
				en todas sus formas de expresión, consolidando en una ventana, variadas alternativas de entretenimiento
				para todo público.
			</p>
			<p>
				Estamos muy comprometidos con la calidad del servicio, que parte con la atención
				personalizada de nuestro equipo y se fortalece con el alto grado de innovación tecnológica
				que hemos logrado en nuestra plataforma, que día a día seguirá evolucionando para lograr más
				beneficios en favor de los usuarios.
			</p>
		</div>
	</div>
</section>

<section class="container">
	<div class="valores ">
		<div>
			<h1>Valores</h1>
		</div>
	</div>
</section>

<section class="container">
	<div class="valores ">
		<div>
			<video playsinline autoplay muted loop class="exvideo">
				<source
					src="https://res.cloudinary.com/maxitech/video/upload/v1667263152/ticketera/banners/Innovacion_xzpkic.webm"
					type="video/webm"
				/>
			</video>
		</div>
		<div>
			<video playsinline autoplay muted loop class="exvideo">
				<source
					src="https://res.cloudinary.com/maxitech/video/upload/v1667263152/ticketera/banners/Servicio_d7is7n.webm"
					type="video/webm"
				/>
			</video>
		</div>
		<div>
			<video playsinline autoplay muted loop class="exvideo">
				<source
					src="https://res.cloudinary.com/maxitech/video/upload/v1667263152/ticketera/banners/Transparencia_j9him2.webm"
					type="video/webm"
				/>
			</video>
		</div>
		<div>
			<video playsinline autoplay muted loop class="exvideo">
				<source
					src="https://res.cloudinary.com/maxitech/video/upload/v1667263152/ticketera/banners/Eficiencia_xkeq2k.webm"
					type="video/webm"
				/>
			</video>
		</div>
	</div>
</section>

<style lang="scss">
	#video {
		object-fit: cover;
		width: 100%;
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
	}

	.exvideo {
		object-fit: cover;
		width: 100%;
		height: auto;
	}

	.breacrumbs {
		padding-left: 24px;
		padding-right: 24px;
		background: white;
		ul {
			padding: 24px 0px;
			display: flex;
			gap: 14px;
			li {
				font-weight: 500;
				font-size: 16px;
				line-height: 24px;
				&.selected {
					a {
						font-weight: 800;
						color: #d30ed1;
					}
				}
			}
		}
	}

	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;

		padding-left: 24px;
		padding-right: 24px;
		flex-direction: column;
		gap: 20px;
		@include breakpoint($md) {
			flex-direction: row;
			margin-top: 110px;
		}
		h1 {
			margin-top: 20px;

			@include breakpoint($md) {
				margin-top: 80px;
			}
		}

		p {
			text-align: justify;
		}
	}

	.valores {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;

		padding-left: 24px;
		padding-right: 24px;
		flex-direction: column;
		gap: 20px;
		@include breakpoint($md) {
			flex-direction: row;
			margin-top: 30px;
		}

		p {
			text-align: justify;
		}
	}

	.content-banner {
		height: 100px;
		width: 100%;
		position: relative;

		@include breakpoint($sm) {
			height: 450px;
		}

		@include breakpoint($md) {
			height: 550px;
		}
	}
	.banner {
		background-size: 100% 100%; /* <------ */
		background-repeat: no-repeat;
		background-position: center center;
		margin: 0 auto;
		gap: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		@include breakpoint($md) {
			height: 315px;
		}

		.titulos {
			padding: 0 0 10px 24px;

			color: #ffffff;

			@include breakpoint($md) {
				padding: 0 0 32px 88px;
			}

			h1 {
				font-weight: 700;
				font-size: 32px;
				line-height: 38px;

				@include breakpoint($md) {
					font-size: 42px;
					line-height: 50px;
				}
			}

			h2 {
				font-weight: 400;
				font-size: 24px;
				line-height: 29px;

				@include breakpoint($md) {
					font-size: 32px;
					line-height: 38px;
				}
			}
		}
	}
</style>
