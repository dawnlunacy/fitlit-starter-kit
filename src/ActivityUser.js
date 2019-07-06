class ActivityUser {
	constructor(array, user) {
		this.array = array;
		this.strideLength = user.strideLength;
		this.dailyStepGoal = user.dailyStepGoal;
		this.friends = user.friends;
	}

	milesWalked(dateString) {
		let numSteps = this.array.find(day => day.date === dateString).numSteps;
		return parseFloat((numSteps * this.strideLength/5280).toFixed(1));
	}

	minutesActive(dateString) {
		return this.array.find(day => day.date === dateString).minutesActive.toLocaleString();
	}	

	stepGoalMet(dateString) {
		return this.array.find(day => day.date === dateString).numSteps >= this.dailyStepGoal
	}

	stairClimbRecord() {
		let nums = this.array.map(day => day.flightsOfStairs)
		return Math.max(...nums)
	}

	lifeTimeTotalMiles() {
		return parseFloat((this.array.reduce((a,b) => a + b.numSteps, 0) * this.strideLength/5280).toFixed(1))
	}

	stepsLatestDay(dateString) {
		let userSteps = this.array.find(day => day.numSteps)
	}

	flightsLatestDay(dateString) {
		let userSteps = this.array.find(day => day.flightsOfStairs)
	}

	weeklyActivity(startDate, endDate) {
		let week = this.array.filter(day => 
			day.date >= startDate && day.date <= endDate)
		return week
	}
}
  
if (typeof module !== 'undefined') {
  module.exports = ActivityUser;
}