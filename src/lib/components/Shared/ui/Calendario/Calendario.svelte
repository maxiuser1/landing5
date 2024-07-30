<script lang="ts">
	import Circlel from '$lib/icons/Circlel.svelte';
	import Circler from '$lib/icons/Circler.svelte';
	import { getDays } from './datepicker';
	import { compraData } from '$lib/components/Evento/esto.js';
	import { onMount } from 'svelte';
	export let evento: App.Evento;

	const monthsNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	let laFecha: string | undefined = $compraData?.evento?.fecha ? $compraData.evento.fecha : undefined;
	let laHora: string | undefined = $compraData?.evento?.hora ? $compraData.evento.hora : undefined;
	$: month = new Date().getMonth();
	$: year = new Date().getFullYear();
	$: days = getDays(month, year);
	$: horasDisponibles = evento.fechas?.filter((t) => t.dia == laFecha)?.map((t) => t.hora) ?? [];

	function fechaDisponible(fecha: string) {
		console.log('fecha', fecha);
		console.log('date', new Date().toISOString());
		if (new Date(fecha) <= new Date()) return false;
		return evento.fechas?.some((t) => t.dia == fecha);
	}

	function selectFecha(fecha: string) {
		laFecha = fecha;
		compraData.update((current) => ({
			...current,
			evento: {
				...current.evento,
				fecha: laFecha,
				hora: ''
			}
		}));
	}

	function selectHora(hora: string) {
		laHora = hora;
		compraData.update((current) => ({
			...current,
			evento: {
				...current.evento,
				hora: laHora
			}
		}));
	}

	function mesAnterior() {
		if (month > 0) {
			month--;
		} else {
			month = 11;
			year--;
		}
	}

	function mesSiguiente() {
		if (month < 11) {
			month++;
		} else {
			month = 0;
			year++;
		}
	}
</script>

<h4>Fecha</h4>
<div class="stage">
	<div class="mes">
		<div>
			<button type="button" class="btn-mes" on:click={mesAnterior}>
				<Circlel />
			</button>
		</div>
		<h5>{monthsNames[month]} {year}</h5>
		<div>
			<button type="button" class="btn-mes" on:click={mesSiguiente}>
				<Circler />
			</button>
		</div>
	</div>
	<div class="grid">
		{#each ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'] as dia}
			<div class="dia">{dia}</div>
		{/each}
		{#each days as day, i (day)}
			<div class="dia">
				{#if day.date.getMonth() == month}
					<button type="button" class="btn-dia" disabled={!fechaDisponible(day.date.toISOString())} class:seleccionada={day.date.toISOString() == laFecha} on:click={() => selectFecha(day.date.toISOString())}>
						{day.date.getDate()}
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>
{#if horasDisponibles.length > 0}
	<h4>Hora</h4>
	<div class="stage">
		<div />
		<div class="horas">
			{#each horasDisponibles as hora}
				<div class="hora" class:seleccionada={laHora == hora} on:click={() => selectHora(hora)}>{hora}</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@import './static/style.scss';

	.btn-dia {
		background-color: transparent;
		border-radius: 50%;
		border: 2px solid #aa56ff;
		width: 32px;
		height: 32px;
		font-weight: bold;
		&:hover {
			border-color: #cb97ff;
		}

		&[disabled] {
			border: none;
			color: rgba(0, 0, 0, 0.3);
		}
	}

	.btn-mes {
		background-color: transparent;
		width: 20px;
		border: none;
	}

	.seleccionada {
		background-color: #aa56ff;
		color: white;
	}

	.mes {
		display: flex;
		justify-content: space-between;
		text-align: center;
	}
	.dia {
		text-align: center;
	}

	.horas {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		grid-gap: 10px;

		.hora {
			background-color: white;
			text-align: center;
			border-radius: 8px;
			border: 2px solid #aa56ff;
			padding: 15px;
			&:hover {
				border: 2px solid #cb97ff;
			}
		}
		.seleccionada {
			background-color: #aa56ff;
			color: white;
		}
	}

	.grid {
		background-color: white;
		border-radius: 8px;
		padding-top: 15px;
		padding-bottom: 15px;
		grid-template: repeat(6, 1fr) / repeat(7, 1fr);
		display: grid;
		row-gap: 5px;
		column-gap: 1px;
		height: 100%;
	}

	.grid {
		background-color: white;
		border-radius: 8px;
		padding-top: 15px;
		padding-bottom: 15px;
		grid-template: repeat(6, 1fr) / repeat(7, 1fr);
		display: grid;
		row-gap: 5px;
		column-gap: 1px;
		height: 100%;
	}

	.stage {
		display: grid;
		grid-row: 2;
		grid-column: 1;

		margin-top: 10px;
	}

	h4 {
		padding-top: 24px;
		padding-bottom: 8px;
	}
</style>
