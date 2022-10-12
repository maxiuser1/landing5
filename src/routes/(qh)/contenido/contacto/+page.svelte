<script>
	import Arrow from '$lib/icons/Arrow.svelte';
</script>

<section class="breacrumbs">
	<div class="container">
		<ul>
			<li>
				<a href="/">
					<Arrow left={true} color={'#d30ed1'} />
				</a>
			</li>
			<li class="selected">
				<a href="/"> Inicio </a>
			</li>
			<li>></li>
			<li>Contacto</li>
		</ul>
	</div>
</section>

<section class="container">
	<form>
		<div>
			<h1>Contacto</h1>
		</div>
		<div class="row">
			<div class="input-group">
				<label for="nombres">Nombres </label>
				<input name="nombres" required />
			</div>
			<div class="input-group">
				<label for="apellidos">Apellidos</label>
				<input name="apellidos" required />
			</div>
		</div>

		<div class="row">
			<div class="input-group">
				<label for="documento">Tipo de documento </label>
				<select name="documento" required>
					<option value="dni">DNI</option>
					<option value="ce">CE</option>
					<option value="ruc">RUC</option>
					<option value="otro">Otro</option>
				</select>
			</div>
			<div class="input-group">
				<label for="apellidos">Número de documento</label>
				<input name="apellidos" required />
			</div>
		</div>

		<div class="row">
			<div class="input-group">
				<label for="correo">Correo </label>
				<input name="correo" type="email" required />
			</div>
			<div class="input-group">
				<label for="telefono">Teléfono</label>
				<input name="telefono" type="tel" required />
			</div>
		</div>

		<div class="row">
			<div class="input-group">
				<label for="detalle">Detalle </label>
				<textarea name="detalle" rows="5" required />
			</div>
		</div>

		<div class="form-footer">
			<button class="btn" type="submit">Enviar</button>
		</div>
	</form>
</section>

<style lang="scss">
	form {
		margin-bottom: 40px;
	}
	.form-footer {
		display: flex;
		justify-content: flex-end;
	}

	p {
		font-size: 14px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 26px;
		margin-bottom: 20px;
	}

	.input-group {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	label {
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
	}

	@media only screen and (max-width: 500px) {
		.row {
			flex-direction: column;
		}
	}

	input {
		border: 1px solid #c6c6c6;
		border-radius: 4px;
		background: #ffffff;
		font-size: 16px;
		padding-left: 12px;
		min-height: 38px;
		max-height: 38px;
	}

	textarea {
		border: 1px solid #c6c6c6;
		border-radius: 4px;
		background: #ffffff;
		padding-left: 12px;
	}

	select {
		border: 1px solid #c6c6c6;
		border-radius: 4px;
		background: #ffffff;
		padding-left: 12px;
		min-height: 42px;
		max-height: 42px;
	}

	input:focus {
		outline: none;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	section {
		margin-top: 30px;
	}

	.breacrumbs {
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
</style>
