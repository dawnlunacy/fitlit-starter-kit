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

console.log(currentUser)

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

$('.infoDisplay').append(`
	<article class = "userInfo">
	  <p> name: <span class = "userName">${currentUser.name}</span> </p>
	  <p> address: <span class = "address">${currentUser.address}</span> </p>
	  <p> email: <span class = "email">${currentUser.email}</span> </p>
	  <p> strideLength: <span class = "strideLength">${currentUser.strideLength} </span> </p>
	  <p> dailyStepGoal: <span class = "dailyStepGoal">${currentUser.dailyStepGoal} </span> </p>
	  <p>Friends</p>
	  <ul>
	    <li>friend1</li>
	    <li>friend2</li>
	    <li>friend3</li>
	  </ul>
	</article>`)

console.log(currentHydrationUser.flOzOneWeek())

$('.infoDisplay').append(`<article class = "hydrationInfo">
          <p> On ${currentHydrationUser.array[currentHydrationUser.array.length - 1].date} You Drank: <span class = "currentDateHydro">${currentHydrationUser.flOzOneDay(currentHydrationUser.array[0].date)} ounces of water!</span> </p>
          <p> Latest Week:<span class = "latestWeekHydro">${currentHydrationUser.flOzOneWeek()}</span> </p>
          <p> Weekly Average: <span class = "weeklyAvgHydro">${currentHydrationRepo.findHydrationAverage()} ounces of water</span> </p>
        </article>`)

$('.infoDisplay').append(`<article class = "sleepInfo">
    <p> On ${currentSleepUser.array[currentSleepUser.array.length - 1].date} you slept ${currentSleepUser.sleepOneDay(currentSleepUser.array[currentSleepUser.array.length - 1].date)} hours with a sleep quality of ${currentSleepUser.sleepQualityOneDay(currentSleepUser.array[currentSleepUser.array.length - 1].date)}!</p>
    <p> Here are the hours of sleep for the last week: ${currentSleepUser.sleepOneWeek('2019/09/16', '2019/09/22')}</p>
    <p> Here is the quality of sleep for the last week: ${currentSleepUser.sleepQualityOneWeek('2019/09/16', '2019/09/22')}</p>
    <p> Here is your average sleep hours for all time: ${currentSleepRepo.findUserSleepAverage()}</p>
     <p> Here is your average sleep quality for all time: ${currentSleepRepo.findUserSleepQualityAverage()}</p>
     </article>`)

$('.infoDisplay').append(`<article class = "activityInfo">
  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you took ${currentActivityUser.stepsLatestDay(currentActivityUser.array[currentActivityUser.array.length - 1].date)} steps!</p>
  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} the average user took ${currentActivityRepo.usersStepsTakenAverage(currentActivityUser.array[currentActivityUser.array.length - 1].date)} steps!</p>

  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you were active for ${currentActivityUser.minutesActive(currentActivityUser.array[currentActivityUser.array.length - 1].date)} minutes!</p>
  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} the average user was active for ${currentActivityRepo.usersMinutesActiveAverage(currentActivityUser.array[currentActivityUser.array.length - 1].date)} minutes!</p>

  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you climbed  ${currentActivityUser.flightsLatestDay(currentActivityUser.array[currentActivityUser.array.length - 1].date)} flights of stairs!</p>
  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} the average user climbed ${currentActivityRepo.usersStairsClimbedAverage(currentActivityUser.array[currentActivityUser.array.length - 1].date)} flights of stairs!</p>


  <p> On ${currentActivityUser.array[currentActivityUser.array.length - 1].date} you were walked ${currentActivityUser.milesWalked(currentActivityUser.array[currentActivityUser.array.length - 1].date)} miles!</p>

  <p> For the week of 2019/06/15 - 2019/06/21 :<br><br> On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].flightsOfStairs} flights of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[0].minutesActive} minutes.</p>

  <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].flightsOfStairs} flight of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[1].minutesActive} minutes.</p>

  <p> On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].flightsOfStairs} flight of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[2].minutesActive} minutes.</p>

  <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].flightsOfStairs} flight of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[3].minutesActive} minutes.</p>

  <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].flightsOfStairs} flight of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[4].minutesActive} minutes.</p>

  <p>On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].flightsOfStairs} flight of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[5].minutesActive} minutes.</p>

  <p> On ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].date} you took ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].numSteps.toLocaleString()} steps, climbed ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].flightsOfStairs} flight of stairs,
  and were active for ${currentActivityUser.weeklyActivity("2019/06/15", "2019/06/21")[6].minutesActive} minutes.</p>
  </article>`)

console.log(currentActivityRepo.totalWeeklySteps("2019/06/15", "2019/06/21"));

	let flightsArray = currentActivityUser.array.map(obj => obj.flightsOfStairs)
		console.log('flights', flightsArray)
		let keysValuesArray = flightsArray.map((obj,i) => [i, obj])
		let resultArr = [];
		console.log(keysValuesArray)
		let testArr = keysValuesArray.forEach((arr, i, array) => {
			if(i !== 0 && i !== 99  && array[--i][1] < arr[1] && arr[1] < array[i += 2][1]){
						resultArr.push(array[i])
			}
		});
		let dateInfo = resultArr.map(arr => 
			currentActivityUser.array[arr[0]].date);
		console.log(resultArr)
		console.log('dateinfo',dateInfo)


    currentActivityRepo.totalWeeklySteps("2019/06/15", "2019/06/21" )
    
});
		// return dateInfo;
// currentActivityUser.increasingStepTrend();
