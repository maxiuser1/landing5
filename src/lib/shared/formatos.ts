export const formatDate = (date: Date | null | undefined): string => {
	if (!date) return '';
	const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};

export const soles = (n: number): string => {
	const currencyFormatter = new Intl.NumberFormat('es-PE', {
		style: 'currency',
		currency: 'PEN'
	});

	return currencyFormatter.format(n).replace(/\u00A0/g, '');
};
