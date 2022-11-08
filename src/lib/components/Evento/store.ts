import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const compraData = writable<App.Compra>(
	browser &&
		(sessionStorage.getItem('compra') ? JSON.parse(sessionStorage.getItem('compra') ?? '') : {})
);

compraData.subscribe((val) => browser && sessionStorage.setItem('compra', JSON.stringify(val)));

export const clearCompradata = () => {
	compraData.set({ evento: {} });
	sessionStorage.clear();
};
