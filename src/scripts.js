const idNumber = Math.floor(Math.random() * 50) + 1;
const currentUserRepo = new UserRepository(userData, idNumber);
const user = currentUserRepo.findUser();
const currentUser = new User({...user});
const currentHydrationRepo = new HydrationRepository(hydrationData, idNumber);
const hydrationUser = currentHydrationRepo.findHydrationUser();
const currentHydrationUser = new HydrationUser([...hydrationUser]);
const currentSleepRepo = new SleepRepository(sleepData, idNumber);
const sleepUser = currentSleepRepo.findSleepUser();
const currentSleepUser = new SleepUser([...sleepUser]);
const currentActivityRepo = new ActivityRepository(activityData, idNumber, userData)
const activityUser = currentActivityRepo.findActivityUser();
const currentActivityUser = new ActivityUser([...activityUser], currentUser)

const stepGoalCanvas = document.getElementById('stepGoalChart');
const hydrationWeekCanvas = document.getElementById('hydrationWeekChart');
const weeklySleepCanvas = document.getElementById('weeklySleepChart');
const latestDaySleepCanvas = document.getElementById('latestDaySleepChart');
const averageSleepCanvas = document.getElementById('averageSleepChart');
const weeklySSMCanvas = document.getElementById('weeklySSMChart');

$('.userFirstName').text(currentUser.giveName());
$('.ouncesToday').text(currentHydrationUser.flOzOneDay('2019/09/22'))

let stepGoalChart = new Chart(stepGoalCanvas, {
    type: 'bar',
    data: {
        labels: ['Your Step Goal', 'Average Step Goal'],
        datasets: [{
            label: 'Current Step Goal',
            data: [currentUser.dailyStepGoal, currentUserRepo.findAverageStepGoal()],
            backgroundColor: [
                'rgba(50, 205, 50, .25)',
                'rgba(255, 99, 132, .25)',
            ],
            borderColor: [
                'rgba(34, 139, 34)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
    	responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let hydrationWeekChart = new Chart(hydrationWeekCanvas, {
    type: 'line',
    data: {
        labels: currentHydrationUser.flOzOneWeek().map(day=> day[0].slice(5)),
        datasets: [{
            label: 'Ounces of Water You Drank Over the Week',
            data: currentHydrationUser.flOzOneWeek().map(day=> day[1]),
            backgroundColor: 'rgba(135, 206, 250, .25)',
            borderColor: 'rgba(0, 191, 255, 1)',
            borderWidth: 1.5
        }]
    },
    options: {
    	responsive: false,
    		scales: {
    		    yAxes: [{
    		        ticks: {
    		            beginAtZero: true
    		        }
    		    }]
    		}
    }
});

let latestDaySleepChart = new Chart(latestDaySleepCanvas, {
    type: 'bar',
    data: {
        labels: ['Sleep Hours 09/22', 'Sleep Quality 09/22'],
        datasets: [{
            label: 'Latest Sleep Data',
            data: [currentSleepUser.sleepPropertyOneDay('2019/09/22', 'hoursSlept'), currentSleepUser.sleepPropertyOneDay('2019/09/22', 'sleepQuality')],
            backgroundColor: [
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
            ],
            borderColor: [
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
    	responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let averageSleepChart = new Chart(averageSleepCanvas, {
    type: 'bar',
    data: {
        labels: ['Average Sleep Hours', 'Average Sleep Quality'],
        datasets: [{
            label: 'Sleep Averages',
            data: [currentSleepRepo.findUserAverage('hoursSlept'), currentSleepRepo.findUserAverage('sleepQuality')],
            backgroundColor: [
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
            ],
            borderColor: [
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
    	responsive: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

let weeklySleepChart = new Chart(weeklySleepCanvas, {
    type: 'bar',
    data: {
        labels: currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'hoursSlept').map(day => day[0].slice(5)),
        datasets: [
        	{
            label: 'Last Week\'s Hours of Sleep',
            data: currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'hoursSlept').map(day => day[1]),
            backgroundColor: [
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
                'rgba(148, 0, 211, .25)',
            ],
            borderColor: [
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
                'rgba(128, 0, 128, 1)',
            ],
            borderWidth: 1,
            yAxisId: 'Sleep Hours'
        },
        {
            type: 'line',
            label: '  Last Week\'s Sleep Quality',
            data: currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'sleepQuality').map(day => day[1]),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(128, 0, 128, 1)',
            yAxisID: 'Sleep Quality',
            borderWidth: 1.5
            },
        ]
    },
    options: {
    	responsive: false,
        scales: {
            yAxes: [  {
                    id: 'Sleep Hours',
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Hours'
                      }
                },
                {
                    id: 'Sleep Quality',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Sleep Quality'
                      }
                },
            ]
        }
    }
});

let weeklySSMChart = new Chart(weeklySSMCanvas, {
    type: 'bar',
    data: {
        labels: currentActivityUser.weeklyActivity('2019/09/16', '2019/09/22').map(day => day.date.slice(5)),
        datasets: [
        	{
            label: 'Step Count',
            data: currentActivityUser.weeklyActivity('2019/09/16', '2019/09/22').map(day => day.numSteps),
            backgroundColor: 'rgba(50, 205, 50, .25)',
            borderColor: 'rgba(34, 139, 34, 1)',
            yAxisID: 'Stepcount',
            borderWidth: 1
        },
        	{
        		type: 'line',
            label: 'Flights of Stairs',
            data: currentActivityUser.weeklyActivity('2019/09/16', '2019/09/22').map(day => day.flightsOfStairs),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(139, 0, 139, 1)',
            yAxisID: 'Flights/Minutes',
            borderWidth: 1.5
                },
                {
            type: 'line',
            label: 'Minutes Active',
            data: currentActivityUser.weeklyActivity('2019/09/16', '2019/09/22').map(day => day.minutesActive),
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(255, 215, 0, 1)',
            yAxisID: 'Flights/Minutes',
            borderWidth: 1.5
                        }
                ]
    },
    options: {
    	responsive: false,
    		scales: {
    		    yAxes: [{
                    id: 'Stepcount',
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Steps'
                      }
                },
               {
                    id: 'Flights/Minutes',
                    position: 'right',
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Flights/Minutes'
                      }
                }]
    		}
    }
});
        
// $('.infoDisplay').append(`
// 	<article class = "userInfo">
// 	  <p> name: <span class = "userName">${currentUser.name}</span> </p>
// 	  <p> address: <span class = "address">${currentUser.address}</span> </p>
// 	  <p> email: <span class = "email">${currentUser.email}</span> </p>
// 	  <p> strideLength: <span class = "strideLength">${currentUser.strideLength} </span> </p>
// 	  <p> dailyStepGoal: <span class = "dailyStepGoal">${currentUser.dailyStepGoal.toLocaleString()} </span> </p>
// 	  <p>Friends:</p>
// 	  <ul>
// 	    <li>friend1</li>
// 	    <li>friend2</li>
// 	    <li>friend3</li>
// 	  </ul>
// 	</article>`)

// $('.infoDisplay').append(`<article class = "hydrationInfo">
//           <p> On ${currentHydrationUser.array[currentHydrationUser.array.length - 1].date} You Drank: <span class = "currentDateHydro">${currentHydrationUser.flOzOneDay(currentHydrationUser.array[0].date)} ounces of water!</span> </p>
//           <p> Latest Week:<span class = "latestWeekHydro">${currentHydrationUser.flOzOneWeek()}</span> </p>
//           <p> Weekly Average: <span class = "weeklyAvgHydro">${currentHydrationRepo.findHydrationAverage()} ounces of water</span> </p>
//         </article>`)

// $('.infoDisplay').append(`<article class = "sleepInfo">
//     <p> On ${currentSleepUser.array[currentSleepUser.array.length - 1].date} you slept ${currentSleepUser.sleepPropertyOneDay(currentSleepUser.array[currentSleepUser.array.length - 1].date, 'hoursSlept')} hours with a sleep quality of ${currentSleepUser.sleepPropertyOneDay(currentSleepUser.array[currentSleepUser.array.length - 1].date, 'sleepQuality')}!</p>
//     <p> Here are the hours of sleep for the last week: ${currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'hoursSlept')}</p>
//     <p> Here is the quality of sleep for the last week: ${currentSleepUser.sleepPropertyOneWeek('2019/09/16', '2019/09/22', 'sleepQuality')}</p>
//     <p> Here is your average sleep hours for all time: ${currentSleepRepo.findUserAverage('hoursSlept')}</p>
//      <p> Here is your average sleep quality for all time: ${currentSleepRepo.findUserAverage('sleepQuality')}</p>
//      </article>`)

// $('.infoDisplay').append(`<article class = "activityInfo">
//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you took ${currentActivityUser.statsLatestDay(currentActivityUser.array[currentActivityUser.array.length - 1].date, 'numSteps')} steps!</p>
//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} the average user took ${currentActivityRepo.usersAverage(currentActivityUser.array[currentActivityUser.array.length - 1].date, 'numSteps')} steps!</p>

//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you were active for ${currentActivityUser.minutesActive(currentActivityUser.array[currentActivityUser.array.length - 1].date)} minutes!</p>
//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} the average user was active for ${currentActivityRepo.usersAverage(currentActivityUser.array[currentActivityUser.array.length - 1].date, 'minutesActive')} minutes!</p>

//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you climbed  ${currentActivityUser.statsLatestDay(currentActivityUser.array[currentActivityUser.array.length - 1].date, 'flightsOfStairs')} flights of stairs!</p>
//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} the average user climbed ${currentActivityRepo.usersAverage(currentActivityUser.array[currentActivityUser.array.length - 1].date, 'flightsOfStairs')} flights of stairs!</p>


//   <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you were walked ${currentActivityUser.milesWalked(currentActivityUser.array[currentActivityUser.array.length - 1].date)} miles!</p>

//   <p> For the week of 2019/06/15 - 2019/06/21 :<br><br> On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].flightsOfStairs} flights of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].minutesActive} minutes.</p>

//   <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].flightsOfStairs} flight of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].minutesActive} minutes.</p>

//   <p> On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].flightsOfStairs} flight of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].minutesActive} minutes.</p>

//   <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].flightsOfStairs} flight of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].minutesActive} minutes.</p>

//   <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].flightsOfStairs} flight of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].minutesActive} minutes.</p>

//   <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].flightsOfStairs} flight of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].minutesActive} minutes.</p>

//   <p> On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].flightsOfStairs} flight of stairs,
//   and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].minutesActive} minutes.</p>
//   </article>`)

// console.log(currentActivityRepo.totalWeeklySteps("2019/06/15", "2019/06/21"));

// currentSleepRepo.findSleepQualityGreaterThanThree("2019/06/15", "2019/06/21")

// console.log('miles', currentActivityUser.lifeTimeTotalMiles())

// currentActivityRepo.totalWeeklySteps("2019/06/15", "2019/06/21")
// currentSleepRepo.findMostSleep("2019/06/15")

// 		currentActivityUser.increasingTrends('numSteps');