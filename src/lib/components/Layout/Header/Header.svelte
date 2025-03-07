<script lang="ts">
	import Supevento from './Supevento.svelte';

	let visible = false;
	let inputph = 'Encuentra tu evento';
	let active = false;

	const toggle = () => {
		visible = !visible;
	};

	const handleInputer = () => {
		inputph = '';
		active = true;
	};

	const handleOutInputer = () => {
		inputph = 'Encuentra tu evento';
		active = false;
	};
</script>

<Supevento />
