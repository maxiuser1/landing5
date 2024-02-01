<script lang="ts">
	import { page } from '$app/stores';
	import { Lupa, User } from '$lib/icons';
	import { slide } from 'svelte/transition';
	import Nav from './Nav.svelte';
	import Bogo from './Bogo.svelte';
	import Autenticable from './Autenticable.svelte';
	import Supevento from './Supevento.svelte';

	let visible = false;
	let inputph = 'Encuentra tu evento';
	let active = false;
	$: active_class = active ? 'searchbox searchbox-focus' : 'searchbox';

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

<style lang="scss">
	@import './static/style.scss';
	.header {
		width: 100%;
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		background: var(--black);

		nav {
			margin: 0 auto;
			height: var(--header-height);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
