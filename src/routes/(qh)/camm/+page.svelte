<script lang="ts">
	import { enhance } from '$app/forms';
	import Barinputer from '$lib/components/Evento/Barinputer.svelte';

	let lista = [
		{
			id: 'demo1'
		},
		{
			id: 'demo2'
		}
	];
</script>

<section class="container">
	<div class="formulario">
		<h1>test</h1>
		<form
			method="POST"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ result, update }) => {
					console.log('resu', result);
					form.reset();
				};
			}}
		>
			{#each lista as item}
				<Barinputer name={item.id} />
			{/each}

			<button type="submit" class="btn"> Guardar </button>
		</form>
	</div>
</section>

<style>
	.formulario {
		padding-top: 40px;
		margin-bottom: 80px;
	}
</style>
