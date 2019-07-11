class SleepUser {
	constructor(array) {
		this.array = array;
		
	}

	sleepPropertyOneDay(dateString, property) {
		let day = this.array.find(day => day.date === dateString);
		return day[property];
	}

	sleepPropertyOneWeek(startDate, endDate, property) {
		let week = this.array.filter(day => day.date >= startDate && day.date <= endDate);
		return week.map(day => [day.date, day[property]])
	}

}

if (typeof module !== 'undefined') {
    module.exports = SleepUser;
};