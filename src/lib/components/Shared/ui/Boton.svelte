<script lang="ts">
	import Spinner from './Spinner.svelte';
	let { children, loading = false, ...others } = $props();
</script>

<button type="button" class="btn" disabled={loading} {...others}>
	{#if loading}
		<Spinner size="24" color="black" />
	{:else}
		{@render children()}
	{/if}
</button>
