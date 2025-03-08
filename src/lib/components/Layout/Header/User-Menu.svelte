<ul role="menu">
	<li role="none">
		<a role="menuitem" href="/">Perfil</a>
	</li>
	<li role="none">
		<a role="menuitem" href="/">Mis entradas</a>
	</li>
	<li role="none">
		<a role="menuitem" data-sveltekit-preload-data="tap" href="/logout">Salir</a>
	</li>
</ul>

<style lang="scss">
	a {
		display: block;
		padding: 24px;
		color: white;
	}

	li {
		position: relative;
		&:not(:first-child) {
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 10%;
				width: 80%;
				height: 1px;
				opacity: 0.5;
				background: #fff;
			}
		}
	}
</style>
