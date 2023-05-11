import { writable } from 'svelte/store';

export const createSearchStore = (data: any) => {
	const { subscribe, set, update } = writable({
		data: data,
		filtered: data,
		search: ''
	});

	return {
		subscribe,
		set,
		update
	};
};

export const searchHandler = (store) => {
	const searchTerm = store.search.toLowerCase() || '';
	console.log('llamo', store.data);
	if (searchTerm) {
		store.filtered = store.data.filter((item: any) => {
			return item.searchTerms ? item.searchTerms.toLowerCase().includes(searchTerm) : false;
		});
	} else {
		store.filtered = store.data;
	}
};
