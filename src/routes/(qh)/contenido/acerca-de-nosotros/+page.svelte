<script lang="ts">
	import Vcarousel from '$lib/components/Home/Vcarousel.svelte';
</script>

<section class="banner">
	<div class="content-banner">
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/hviKUJzcxLA"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>
	<div class="content-banner">
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/n7MV7fck4YQ"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>
	<div class="content-banner">
		<iframe
			width="560"
			height="315"
			src="https://www.youtube.com/embed/k_UkpgNdHMY"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>
</section>

<section class="container">
	<div class="info ">
		<div>
			<h1>Nosotros</h1>
			<p>
				Quehay.pe nace con la iniciativa de difundir el arte y cultura en todas sus formas de
				expresión, consolidando en una ventana, variadas alternativas de entretenimiento para todo
				público.
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
	<div class="info ">
		<div>
			<h1>Valores:</h1>
			<ul>
				<li>1. Innovación</li>
				<li>2. Eficiencia</li>
				<li>3. Transparencia</li>
				<li>4. Enfoque de Servicio</li>
			</ul>
		</div>
	</div>
</section>

<section class="container">
	<div class="info ">
		<div />
	</div>
</section>

<style lang="scss">
	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 80px;

		flex-direction: column;
		gap: 20px;
		@include breakpoint($md) {
			flex-direction: row;
		}

		.map {
			width: 312px;

			@include breakpoint($md) {
				width: 446px;
			}

			iframe {
				width: 312px;
				height: 258;
				@include breakpoint($md) {
					width: 446px;
				}
			}
		}

		h4 {
			margin-bottom: 16px;
		}

		p.fechas {
			font-weight: 500;
			font-size: 16px;
			line-height: 16px;
		}
		p.lastp {
			margin-top: 8px;
			margin-bottom: 60px;
		}

		.luagar {
			font-weight: 400;
			font-size: 14px;
			line-height: 16px;
			color: #1b1b1b;
		}
	}
	.content-banner {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
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
