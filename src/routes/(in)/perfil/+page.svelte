<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	import Check from '$lib/icons/Check.svelte';

	let { data, form } = $props();
	let { user } = data;
	let loading = $state(false);
</script>

<section class="minicontainer mt-90">
	<h1 class="titulo--suprayado">Perfil</h1>
	<form
		method="POST"
		use:enhance={({ formElement, formData, action, cancel }) => {
			loading = true;
			return async ({ result }) => {
				loading = false;
				await applyAction(result);
			};
		}}
	>
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
					<input type="number" name="dni" bind:value={user.dni} class:error={!!user.dni} />
				{/if}
			</div>
			<div class="form-group">
				<label for="email">Nombre</label>
				<input type="text" name="nombre" bind:value={user.nombre} />
			</div>
			<div class="form-group">
				<label for="email">Apellido</label>
				<input type="text" name="apellido" bind:value={user.apellido} />
			</div>
			<div class="form-group">
				<label for="email">Teléfono</label>
				<input type="text" name="telefono" bind:value={user.telefono} />
			</div>
			<div class="form-group">
				<label for="email">Ciudad</label>
				<input type="text" name="ciudad" bind:value={user.ciudad} />
			</div>
		</div>
		<div class="mt-20 flexed">
			<Boton type="submit" {loading}>
				{#if form?.success}
					<Check />
				{/if}
				Guardar
			</Boton>
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
