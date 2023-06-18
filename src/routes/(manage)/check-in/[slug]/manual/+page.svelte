<script lang="ts">
	import { applyAction, enhance } from '$app/forms';

	let numeroTicket: any;
	const clickGeneral = () => {
		window.location.href = `/check-in/urban/impreso/GENERAL/${numeroTicket.value}`;
	};

	const clickVip = () => {
		window.location.href = `/check-in/urban/impreso/VIP/${numeroTicket.value}`;
	};

	const clickSuper = () => {
		window.location.href = `/check-in/urban/impreso/BOX/${numeroTicket.value}`;
	};

	const clickGeneralDirecto = () => {
		window.location.href = `/check-in/urban/impreso/GENERAL/${numeroTicket.value}`;
	};

	const clickVipDirecto = () => {
		window.location.href = `/check-in/urban/impreso/VIP/${numeroTicket.value}`;
	};

	const clickSuperDirecto = () => {
		window.location.href = `/check-in/urban/impreso/BOX/${numeroTicket.value}`;
	};
</script>

<section class="container">
	<div class="formulario">
		<div class="form-group">
			<h4>Picado de ticket físico</h4>
		</div>

		<form
			method="POST"
			autocomplete="off"
			use:enhance={({ form, data, action, cancel }) => {
				return async ({ result }) => {
					applyAction(result);
				};
			}}
		>
			<div class="form-group">
				<input type="text" name="numero" id="numero" required placeholder="Número de ticket" bind:this={numeroTicket} />
			</div>
			<div class="form-group">
				<button on:click={clickGeneral} class="btn" type="button">GENERAL</button>
			</div>

			<div class="form-group">
				<button on:click={clickVip} class="btn" type="button">VIP</button>
			</div>

			<div class="form-group">
				<button on:click={clickSuper} class="btn" type="button">BOX</button>
			</div>

			<div class="form-group">
				<button class="btn" type="submit" name="GENERAL">GENERAL DIRECTO</button>
			</div>
			<div class="form-group">
				<button class="btn" type="submit" name="VIP">VIP DIRECTO</button>
			</div>
			<div class="form-group">
				<button class="btn" type="submit" name="SUPER">BOX</button>
			</div>
		</form>
	</div>
</section>

<style lang="scss">
	@import './static/style.scss';

	.formulario {
		margin: 120px 0px;
		padding: 20px;

		button {
			width: 100%;
		}
	}
	input {
		width: 200px;
		height: 40px;
	}
</style>
