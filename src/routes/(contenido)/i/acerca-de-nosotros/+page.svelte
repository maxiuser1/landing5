<video style="width:100%" playsinline autoplay muted loop id="video">
	<source src="https://epcdnqhprd.azureedge.net/assets/videos-acerca-de-nosotros/nosotros.mp4" type="video/mp4" />
</video>

<section class="container">
	<div class="info">
		<div>
			<h1>Nosotros</h1>
			<p>
				<span style="color:#d30ed1">Quehay.pe</span> nace con la iniciativa de difundir el arte y cultura en todas sus formas
				de expresión, consolidando en una ventana, variadas alternativas de entretenimiento para todo público.
			</p>
			<p>
				Estamos muy comprometidos con la calidad del servicio, que parte con la atención personalizada de nuestro equipo
				y se fortalece con el alto grado de innovación tecnológica que hemos logrado en nuestra plataforma, que día a
				día seguirá evolucionando para lograr más beneficios en favor de los usuarios.
			</p>
		</div>
	</div>
</section>

<section class="container">
	<div class="valores">
		<div>
			<h1>Valores</h1>
		</div>
	</div>
</section>

<section class="container">
	<div class="valores">
		<div>
			<video playsinline muted class="exvideo">
				<source
					src="https://epcdnqhprd.azureedge.net/assets/videos-acerca-de-nosotros/Eficiencia.mp4"
					type="video/mp4"
				/>
			</video>
		</div>
		<div>
			<video playsinline muted class="exvideo">
				<source
					src="https://epcdnqhprd.azureedge.net/assets/videos-acerca-de-nosotros/Innovacion.mp4"
					type="video/mp4"
				/>
			</video>
		</div>
		<div>
			<video playsinline autoplay muted class="exvideo">
				<source src="https://epcdnqhprd.azureedge.net/assets/videos-acerca-de-nosotros/Servicio.mp4" type="video/mp4" />
			</video>
		</div>
		<div>
			<video playsinline autoplay muted class="exvideo">
				<source
					src="https://epcdnqhprd.azureedge.net/assets/videos-acerca-de-nosotros/Transparencia.mp4"
					type="video/mp4"
				/>
			</video>
		</div>
	</div>
</section>

<style lang="scss">
	@use '$lib/scss/breakpoints' as mixin;
	@use '$lib/scss/container';

	.exvideo {
		object-fit: cover;
		width: 100%;
		height: auto;
	}

	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;

		padding-left: 24px;
		padding-right: 24px;
		flex-direction: column;
		gap: 20px;
		@include mixin.breakpoint(mixin.$md) {
			flex-direction: row;
			margin-top: 20px;
		}
		h1 {
			margin-top: 20px;
			margin-bottom: 20px;
			@include mixin.breakpoint(mixin.$md) {
				margin-top: 10px;
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
		@include mixin.breakpoint(mixin.$md) {
			flex-direction: row;
			margin-top: 30px;
		}
	}
</style>
