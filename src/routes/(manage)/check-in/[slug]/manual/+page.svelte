<script lang="ts">
	let numeroTicket: any;
	const clickGeneral = () => {
		window.location.href = `/check-in/vilmapalma/impreso/GENERAL/${numeroTicket.value}`;
	};

	const clickVip = () => {
		window.location.href = `/check-in/vilmapalma/impreso/VIP/${numeroTicket.value}`;
	};

	const clickSuper = () => {
		window.location.href = `/check-in/vilmapalma/impreso/SUPER/${numeroTicket.value}`;
	};
</script>

<section class="container">
	<div class="formulario">
		<div class="form-group">
			<h4>Picado de ticket físico</h4>
		</div>
		<div class="form-group">
			<input type="text" placeholder="Número de ticket" bind:this={numeroTicket} />
		</div>
		<div class="form-group">
			<button on:click={clickGeneral} class="btn">GENERAL</button>
		</div>

		<div class="form-group">
			<button on:click={clickVip} class="btn">VIP</button>
		</div>

		<div class="form-group">
			<button on:click={clickSuper} class="btn">SUPER VIP</button>
		</div>
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
