import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const compraData = writable<App.Esto>(browser && (localStorage.getItem('compra') ? JSON.parse(localStorage.getItem('compra') ?? '') : {}));

compraData.subscribe((val) => browser && localStorage.setItem('compra', JSON.stringify(val)));

export const clearCompradata = () => {
	browser && compraData.set({ evento: { id: '', slug: '' }, entradas: [], total: 0 });
	if (browser && localStorage) {
		localStorage.clear();
	}
};
