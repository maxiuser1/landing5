<script lang="ts">
	import { page } from '$app/stores';
	import { User } from '$lib/icons';
</script>

<div class="menu">
	{#if $page.data.user}
		<div class="profile">
			<div class="info">
				<ul>
					<li>
						<a href="../../perfil">Perfil</a>
					</li>
					<li>
						<a href="../../entradas">Mis entradas</a>
					</li>
					<li>
						<a href="../../entradas">E-tickets</a>
					</li>
					<li>
						<a href="../../logout"> Salir </a>
					</li>
				</ul>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import './static/style.scss';
	.footer {
		border-top: 1px solid #80057f;
		padding-top: 20px;
		width: 100%;
		text-align: end;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: 20px;
		li {
			font-size: 14px;
			font-weight: 500;
			width: 300px;
			padding-bottom: 12px;
			border-bottom: 1px solid rgba(255, 255, 255, 0.171);

			&:last-child {
				border-bottom: none;
			}
		}
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
		background-color: #80057f;
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
		border-radius: 4px;
	}

	a {
		color: #fff;
	}
</style>
