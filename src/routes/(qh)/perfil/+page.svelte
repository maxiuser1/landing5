<script lang="ts">
	import { Header } from '$lib/components/Layout';
	import { page } from '$app/stores';
</script>

<Header slug={''} />

<div class="container">
	<div class="contenido">
		<h2 class="titulo--suprayado">Perfil</h2>
		<div class="datos">
			Hola, {$page.data.user.nombre} <br />
			<span class="correo">{$page.data.user.correo}</span>
		</div>
	</div>
	<div class="form">
		<div class="formulario">
			<div class="form-group">
				<label for="nombres">Nombres</label>
				<input type="text" name="nombre" placeholder="Ejem. Jose Luis" value={$page.data.user.nombre} />
			</div>

			<div class="form-group">
				<label for="apellidos">Apellidos</label>
				<input type="text" name="apellido" placeholder="Ejem. Quispe Huaman" value={$page.data.user.apellido} />
			</div>

			<div class="form-group">
				<label for="correo">Email</label>
				<input type="email" name="correo" placeholder="Ejem. usuario@mai.com" value={$page.data.user.correo} />
			</div>

			<div class="row">
				<div class="col">
					<div class="form-group">
						<label for="dni">Tipo de documento</label>
						<select>
							<option value="DNI">DNI</option>
							<option value="CE">CE</option>
							<option value="PASAPORTE">PASAPORTE</option>
						</select>
					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label for="dni">Número de documento</label>
						<input type="text" name="dni" placeholder="0000000" value={$page.data.user.dni} />
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col">
					<div class="form-group">
						<label for="telefono">Teléfono</label>
						<input type="text" name="telefono" placeholder="00000000" style="width: 150px;" value={$page.data.user.telefono} />
					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label for="correo">Nacionalidad</label>
						<input type="text" name="nacionalidad" placeholder="Ejem. peruano" value={$page.data.user.nacionalidad ?? ''} />
					</div>
				</div>
			</div>
		</div>
	</div>
	<br />
	<br />
	<br />
	<br />
	<br />
</div>

<style lang="scss">
	@import './static/style.scss';

	.formulario {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.row {
		display: flex;
		gap: 20px;
		flex-direction: column;
		@include breakpoint($md) {
			flex-direction: row;
		}
	}

	.form {
		background: #f9f9f9;
	}

	.correo {
		font-size: 12px;
	}
	.contenido {
		background: #f9f9f9;
		margin-top: 50px;
		padding: 24px;
	}
</style>
