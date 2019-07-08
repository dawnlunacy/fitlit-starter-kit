class SleepUser {
	constructor(array) {
		this.array = array;
	}

	// sleepOneDay(dateString) {
	// 	let day = this.array.find(day => day.date === dateString)
	// 	return day.hoursSlept;
	// }

	// sleepQualityOneDay(dateString) {
	// 	let day = this.array.find(day => day.date === dateString)
	// 	return day.sleepQuality;
	// }

	sleepPropertyOneDay(dateString, property) {
		let day = this.array.find(day => day.date === dateString);
		return day[property];
	}

	// sleepOneWeek(startDate, endDate) {
	// 	let week = this.array.filter(day => day.date >= startDate && day.date <= endDate)
	// 	let display = ``
	// 	week.forEach(day => display += `<p>On ${day.date} you slept ${day.hoursSlept} hours!</p>`);
	// 	return display;
	// }

	// sleepQualityOneWeek(startDate, endDate) {
	// 	let week = this.array.filter(day => day.date >= startDate && day.date <= endDate)
	// 	let display = ``
	// 	week.forEach(day => display += `<p>On ${day.date} your sleep quality was ${day.sleepQuality}!</p>`);
	// 	return display;
	// }

	sleepPropertyOneWeek(startDate, endDate, property) {
		let week = this.array.filter(day => day.date >= startDate && day.date <= endDate);
		return week.map(day => [day.date, day[property]])
	}

}

if (typeof module !== 'undefined') {
    module.exports = SleepUser;
};