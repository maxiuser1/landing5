<script lang="ts">
	import { page } from '$app/stores';
	import { User } from '$lib/icons';
</script>

<div class="menu">
	{#if $page.data.user}
		<div class="profile">
			<div class="circle">J</div>
			<div class="info">
				<div class="nombre">
					{$page.data.user.nombre}
					{$page.data.user.apellido}
				</div>
				<div class="correo">
					{$page.data.user.correo}
				</div>

				<div class="links">
					<a href="../../entradas">Mis entradas</a>
				</div>
			</div>
		</div>
	{/if}
	<div class="footer">
		<a href="../../logout" class="salir"> Salir </a>
	</div>
</div>

<style>
	.footer {
		border-top: 1px solid #80057f;
		padding-top: 20px;
		width: 100%;
		text-align: end;
	}

	.profile {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.circle {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22px;
		position: relative;
		width: 44px;
		color: black;
		height: 44px;
		border-radius: 50%;
		background-color: #ff0036;
	}

	.correo {
		font-size: 10px;
		padding-bottom: 10px;
	}

	.links {
		margin-top: 5px;
		font-size: 14px;
		text-decoration: underline;
	}

	.salir {
		border: 1px solid white;
		padding: 4px 14px;
		font-size: 12px;
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-width: 300px;
	}

	a {
		color: #fff;
	}
</style>
