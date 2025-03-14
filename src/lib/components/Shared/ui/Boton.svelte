<script lang="ts">
	import Spinner from './Spinner.svelte';
	let { children, loading = false, ...others } = $props();
</script>

<button type="button" class="btn" {...others}>
	{#if loading}
		<Spinner size="24" color="red" />
	{:else}
		{@render children()}
	{/if}
</button>
