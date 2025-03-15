<script lang="ts">
	import Listo from '$lib/icons/Listo.svelte';
	import User from '$lib/icons/User.svelte';

	let { data, form } = $props();
	let dni = $state<string | null>(data?.user?.dni ?? null);
	let { user } = data;
</script>

<section class="minicontainer mt-90">
	{#if form?.success}
		<Listo />
	{/if}

	<h1 class="titulo--suprayado">Perfil</h1>
	<form method="POST">
		<div class="form mt-40">
			<div class="form-group">
				<label for="name">Correo</label>
				<input type="text" name="correo" value={user.correo} disabled />
			</div>
			<div class="form-group">
				<label for="email">DNI</label>
				{#if user.dni}
					<input type="text" name="dni" value={user.dni} disabled />
				{:else}
					<input type="number" name="dni" bind:value={dni} class:error={dni == null} />
				{/if}
			</div>
			<div class="form-group">
				<label for="email">Nombre</label>
				<input type="text" name="nombre" value={user.nombre} />
			</div>
			<div class="form-group">
				<label for="email">Apellido</label>
				<input type="text" name="apellido" value={user.apellido} />
			</div>
			<div class="form-group">
				<label for="email">Teléfono</label>
				<input type="text" name="telefono" value={user.telefono} />
			</div>
			<div class="form-group">
				<label for="email">Ciudad</label>
				<input type="text" name="ciudad" value={user.ciudad} />
			</div>
		</div>
		<div class="mt-20">
			<button class="btn" type="submit">Guardar</button>
		</div>
	</form>
</section>

<style lang="scss">
	@use '$lib/scss/form' as form;
	@use '$lib/scss/breakpoints' as mixin;
	.form {
		display: grid;
		grid-template-columns: 1fr;
		@include mixin.breakpoint(mixin.$sm) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
