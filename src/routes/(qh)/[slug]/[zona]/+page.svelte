<script lang="ts">
	export let data;
	let { evento, zona }: { evento: App.Evento; zona: App.Precio } = data;
</script>

<div>
	{evento.nombre}
	{zona.nombre}
</div>
