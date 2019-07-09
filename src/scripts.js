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

$(document).ready(function() {

  var $grid = $('.grid').packery({
  itemSelector: '.grid-item',
  columnWidth: 50,
  rowHeight: 40,
  gutter: 10,
});

var $draggable = $('.draggable').draggabilly({
  // options...
})


var $grid = $('.grid').packery({
  itemSelector: '.grid-item',
  // columnWidth helps with drop positioning
  columnWidth: 100
});

// make all grid-items draggable
$grid.find('.grid-item').each( function( i, gridItem ) {
  var draggie = new Draggabilly( gridItem );
  // bind drag events to Packery
  $grid.packery( 'bindDraggabillyEvents', draggie );
});

$('.userFirstName').text(currentUser.giveName());
$('.ouncesToday').text(currentHydrationUser.flOzOneDay('2019/09/22'))

currentActivityRepo.totalWeeklySteps('2019/09/16','2019/09/22')
currentActivityUser.increasingTrends('numSteps')
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

function stepChallengePrep() {
	var additionalObject = {id: currentUser.id, 	steps: currentActivityUser.weeklyActivity('2019/09/16', '2019/09/22').reduce((a, b) => a + b.numSteps, 0)};
	var completeStepsArray = currentActivityRepo.totalWeeklySteps('2019/09/16', '2019/09/22');
	completeStepsArray.unshift(additionalObject);
	var namesArray = completeStepsArray.map(user => userData.find(obj => obj.id === user.id)).map(user => user.name.split(' ')[0]);
	namesArray.forEach((firstname, i) => {
		completeStepsArray[i]['name'] = firstname;
	});
	return completeStepsArray
}

function displayStepChallenge(startDate, endDate) {
	let display = `During the Week of ${startDate.slice(5)} to ${endDate.slice(5)}: <br><br>`;
	stepChallengePrep().forEach(obj => display += `${obj.name} had a total of ${obj.steps.toLocaleString()} steps! <br>`)
	$('.infoDisplay').append(display)
}

displayStepChallenge('2019/09/16', '2019/09/22')
});

