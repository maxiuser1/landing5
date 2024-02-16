import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const compraData = writable<App.Esto>(browser && (sessionStorage.getItem('compra') ? JSON.parse(sessionStorage.getItem('compra') ?? '') : {}));

compraData.subscribe((val) => browser && sessionStorage.setItem('compra', JSON.stringify(val)));

export const clearCompradata = () => {
	browser && compraData.set({ evento: { id: '', slug: '' }, entradas: [], total: 0 });
	if (browser && sessionStorage) {
		sessionStorage.clear();
	}
};
