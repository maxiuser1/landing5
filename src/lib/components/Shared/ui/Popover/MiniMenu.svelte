<script lang="ts">
	import { page } from '$app/stores';
	import { User } from '$lib/icons';
</script>

<div class="menu">
	<ul>
		<li>
			{#if $page.data.user}
				<div class="circle"><User /> <span class="anchormenu">{$page.data.user.nombre} {$page.data.user.apellido}</span></div>
			{/if}
		</li>
		<li>
			<a href="../../logout">
				<div class="salir">Salir</div>
			</a>
		</li>
	</ul>
</div>

<style>
	.circle {
		padding: 10px;
		border-bottom: 1px solid #80057f;
	}

	.salir {
		padding: 10px;
	}
	.menu {
		min-width: 300px;
		max-width: 300px;
	}
	a {
		color: #fff;
	}
</style>
