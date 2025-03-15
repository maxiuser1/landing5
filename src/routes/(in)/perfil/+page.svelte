<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Boton from '$lib/components/Shared/ui/Boton.svelte';
	import Check from '$lib/icons/Check.svelte';

	let { data, form } = $props();
	let { user, categorias } = data;
	let loading = $state(false);
	let favoritos = $state<string[]>(user.favoritos ?? []);
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

		<h4 class="mt-40">Favoritos</h4>

		<div class="favoritos mt-20">
			{#each categorias as categorizacion}
				<div>
					<h6>{categorizacion.tipo}</h6>
					<div class="option-grid">
						{#each categorizacion.categorias as categoria}
							<label class="option-chip" class:option-chip--selected={favoritos.includes(categoria)}>
								<input type="checkbox" name="categories" value={categoria} bind:group={favoritos} />
								<span class="name">{categoria}</span>
							</label>
						{/each}
					</div>
				</div>
			{/each}
			<input type="hidden" name="categoriesval" bind:value={favoritos} />
		</div>

		<div class="mt-20 flexed">
			<Boton type="submit" {loading} class="btn--outline">
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

	.favoritos {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.option-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		grid-gap: 0.5rem;
	}

	.option-chip {
		position: relative;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.75rem;
		background-color: #fff;
		border-radius: 1rem;
		cursor: pointer;
		font-size: 0.85rem;
		height: auto;
		min-height: 32px;

		input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;
		}

		&--selected {
			background-color: var(--pink);
			color: #fff;
		}
	}

	.form {
		display: grid;
		grid-template-columns: 1fr;
		@include mixin.breakpoint(mixin.$sm) {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
