<script lang="ts">
	export let categories: Array<string>;
</script>

<header class="main">
	<nav class="container">
		<ul>
			{#each categories as category}
				<li>{category}</li>
			{/each}
		</ul>
	</nav>
</header>
