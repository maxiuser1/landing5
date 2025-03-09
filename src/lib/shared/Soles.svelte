<script lang="ts">
	let { number }: { number: number } = $props();

	let formatted = new Intl.NumberFormat('es-PE', {
		style: 'decimal',
		minimumFractionDigits: 2
	}).format(number);
</script>

<span>S/ {formatted}</span>
