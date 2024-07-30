export const getDays = (month: number, year: number) => {
	const startOfWeekIndex = 1;
	let last = { date: new Date(year, month, 1), outsider: false };
	const days = [];

	while (last.date.getMonth() === month) {
		days.push(last);
		const date = new Date(last.date);
		date.setDate(last.date.getDate() + 1);
		last = { date, outsider: false };
	}

	while (days[0].date.getDay() !== startOfWeekIndex) {
		const date: Date = new Date(days[0].date);
		date.setDate(days[0].date.getDate() - 1);
		days.unshift({
			date,
			outsider: true
		});
	}

	last.outsider = true;
	while (days.length < 42) {
		days.push(last);
		last = { date: new Date(last.date), outsider: true };
		last.date.setDate(last.date.getDate() + 1);
	}
	return days;
};
