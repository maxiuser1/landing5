export const formatDate = (date: Date | null | undefined): string => {
	if (!date) return '';
	const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
	const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
	const year = date.getFullYear();

	return `${day}/${month}/${year}`;
};
