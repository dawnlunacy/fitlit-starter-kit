class ActivityRepository {
	constructor(activityDataset, id, userDataset) {
		this.activityDataset = activityDataset;
		this.id = id;
		this.userActivity = this.findActivityUser();
		this.userDataset = userDataset;
		this.user = this.findUser();
		this.strideLength = this.user.strideLength;
		this.dailyStepGoal = this.user.dailyStepGoal;
		this.friends = this.user.friends;
	}

	findActivityUser() {
		return this.activityDataset.filter(user => user.userID === this.id)
	}

	findUser() {
		return this.userDataset.find(user => user.id === this.id)
	}

	minutesActiveWeekAverage(startDate, endDate) {
		let week = this.userActivity.filter(day => 
			day.date >= startDate && day.date <= endDate);
		return Math.floor(week.reduce((a,b) => 
			a + b.minutesActive, 0)/week.length)
	}

	exceedStepGoal() {
		return this.userActivity.filter(day => 
			day.numSteps >= this.dailyStepGoal).map(day => day.date)
	}

	usersAverage(dateString, property) {
		let date = this.activityDataset.filter(day => day.date === dateString);
		return Math.ceil(date.reduce((a,b) => 
			a + b[property], 0)/date.length);
	}

	totalWeeklySteps(startDate, endDate) {
		let filteredMap = this.friends.map(friend => this.activityDataset.filter(day=>
			day.userID === friend && day.date >= startDate && day.date <= endDate
		).reduce((a,b) => {
			if(!a['id']) {
				a['id'] = b.userID;
				a['steps'] = 0;
			}
			a['steps'] += b.numSteps;
			return a;
		}, {}));
		return filteredMap;
	}

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}