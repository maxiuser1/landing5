<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Shared/ui/Spinner/Spinner.svelte';
	import { Arrow } from '$lib/icons';

	export let form: any;
	export let data;
	let { user } = data;
	let posting = false;
</script>

<div class="registro">
	<a href="/" class="btn-outline">
		<Arrow color="#D30ED1" left={true} />
		Volver al inicio
	</a>
	<div class="form">
		<div class="titulo">Completa el registro</div>
		<form
			autocomplete="off"
			use:enhance={({ form, data, action, cancel }) => {
				posting = true;
				return async ({ result }) => {
					applyAction(result);
				};
			}}
		>
			<input name="redirectTo" value={$page.url.searchParams.get('redirectTo')?.toString() ?? ''} type="hidden" />
			<div>
				<div class="form-group">
					<label for="correo">Correo</label>
					<input name="correo" value={user.correo} disabled />
				</div>

				<div class="form-group">
					<label for="nombres">Nombre</label>
					<input type="text" name="nombre" required />
				</div>

				<div class="form-group">
					<label for="apellidos">Apellidos</label>
					<input type="text" name="apellido" required />
				</div>

				<div class="form-group">
					<label for="dni">DNI</label>
					<input type="text" name="dni" required />
				</div>

				<div class="form-group">
					<label for="telefono">Teléfono</label>
					<input type="text" name="telefono" required />
				</div>
			</div>
			<div>
				<button class="btn" type="submit" disabled={posting}>
					{#if posting}
						<Spinner size="20" color="#D30ED1" unit="px" />
					{:else}
						Confirmar <Arrow color="white" />
					{/if}
				</button>
			</div>
		</form>

		<div class="texto">
			<p />
		</div>
	</div>
</div>

<style lang="scss">
	@import './static/style.scss';
	button[disabled='disabled'],
	button:disabled {
		background: #d30ed038 !important;
	}

	.registro {
		margin: 0 auto;
		max-width: 380px;
		padding-top: 42px;
	}
	.form {
		margin-top: 24px;

		.titulo {
			font-weight: 900;
			font-size: 24px;
			line-height: 29px;
			margin-bottom: 24px;
		}

		label {
			font-weight: 600;
			font-size: 14px;
			line-height: 24px;
		}

		input {
			min-width: 100%;
			max-width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			border: 1px solid #c6c6c6;
			border-radius: 4px;
			background: #ffffff;
			height: 42px;
		}

		.form-group {
			margin-bottom: 32px;
		}

		.btn {
			width: 100%;
			font-weight: 600;
			font-size: 16px;
			line-height: 24px;
		}
	}
	// input[type='number'] {
	// 	-moz-appearance: textfield;
	// }

	// input::-webkit-outer-spin-button,
	// input::-webkit-inner-spin-button {
	// 	-webkit-appearance: none;
	// }

	// input:focus {
	// 	outline: none;
	// }

	// .usuario {
	// 	margin-top: 24px;
	// }

	// .contrasena {
	// 	margin-top: 32px;
	// }

	// .btn {
	// 	margin-top: 34px;
	// 	margin-bottom: 24px;
	// 	width: 100%;
	// }

	// .error {
	// 	margin-top: 10px;
	// 	color: red;
	// }
	// .socials {
	// 	margin-top: 24px;
	// 	margin-bottom: 24px;
	// 	display: flex;
	// 	gap: 10px;

	// 	form {
	// 		width: 100%;
	// 		.btn-social {
	// 			background: #ffffff;
	// 			/* White/White_80 */
	// 			border: 1px solid #c6c6c6;
	// 			border-radius: 4px;
	// 			padding: 10px 0px;
	// 			width: 100%;
	// 		}
	// 	}
	// }

	// .texto {
	// 	width: 100%;
	// 	text-align: center;
	// 	p {
	// 		font-weight: 400;
	// 		font-size: 14px;
	// 		line-height: 24px;
	// 	}

	// 	.link {
	// 		color: #d30ed1;
	// 	}
	// }

	// .titulo {
	// 	color: #d30ed1;
	// 	font-weight: 700;
	// 	font-size: 30px;
	// 	line-height: 36px;
	// 	border-bottom: 2px solid #d30ed1;
	// }

	// .recordar {
	// 	label {
	// 		font-weight: 400;
	// 		font-size: 14px;
	// 		line-height: 20px;
	// 	}
	// }

	// .form {
	// 	margin-top: 22px;

	// 	.btn {
	// 		width: 100%;
	// 	}
	// }

	// .controls {
	// 	margin-top: 32px;
	// 	margin-bottom: 32px;

	// 	.usuario {
	// 		margin-bottom: 20px;
	// 	}

	// 	input {
	// 		width: 100%;
	// 		padding: 6px 12px;
	// 		border: 1px solid #c6c6c6;
	// 		border-radius: 4px;
	// 		background: #ffffff;
	// 		height: 42px;
	// 	}
	// }
</style>
