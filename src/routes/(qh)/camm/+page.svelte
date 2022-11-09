<script lang="ts">
	import { enhance } from '$app/forms';
	import Barinputer from '$lib/components/Evento/Barinputer.svelte';
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
					alert('Su formulario de contacto ha sido enviado, muchas gracias.');
				};
			}}
		>
			<Barinputer name={'jose'} />
		</form>
	</div>
</section>

<style>
	.formulario {
		padding-top: 40px;
		margin-bottom: 80px;
	}
</style>
