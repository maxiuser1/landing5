import { writable, get } from 'svelte/store';

export const cartItems = writable<App.ProductoComprado[]>([]);

export const addToCart = (id: string, cantidad: number, total: number, nombre: string) => {
	let items = get(cartItems);

	console.log('i', items);

	let itemPosition = items.findIndex((item) => {
		return item.id == id;
	});

	if (itemPosition !== -1) {
		cartItems.update(() => {
			let updatedItems = items.map((item) => {
				if (item.id === id) {
					return { ...item, cantidad, total };
				}
				return item;
			});

			return updatedItems;
		});
	} else {
		cartItems.update(() => {
			return [...items, { id: id, cantidad, total, nombre }];
		});
	}
};

export const removeFromCart = (id: string) => {
	let items = get(cartItems);
	let itemPosition = items.findIndex((item) => {
		return item.id == id;
	});

	// [ {id: "1", quantity: 1} ]
	if (items[itemPosition]?.cantidad - 1 === 0) {
		items.splice(itemPosition, 1);
	}
	// [ ]

	cartItems.update(() => {
		// items: [ { id: "1", quantity: 6 }, { id: "2", quantity: 3 } ]
		// updatedItems: [{ id: "1", quantity: 5 }, { id: "2", quantity: 3 } ]
		let updatedItems = items.map((item) => {
			if (item.id === id) {
				return { ...item, cantidad: item.cantidad - 1 };
			}
			return item;
		});

		return updatedItems;
	});
};
