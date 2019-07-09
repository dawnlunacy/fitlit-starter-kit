const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository.js');
const SleepUser = require('../src/SleepUser.js');
const mockSleepData = require('../mock-data/mock-sleep-data.js');


let newSleepRepository, newSleepUser, newSleepUserInfo;

describe('SleepUser', function() {
	beforeEach(function() {
		newSleepRepository = new SleepRepository(mockSleepData, 1);
		newSleepUser = new SleepUser(newSleepRepository.findSleepUser());
	});

	it('should be a function', function() {
		expect(SleepUser).to.be.a('function')
	});

	it('should be an instance of SleepUser', function() {
		expect(newSleepUser).to.be.an.instanceOf(SleepUser)
	});

	describe('sleepPropertyOneDay', function() {
		it('should show how many hours a user slept on a specific day', function() {
			expect(newSleepUser.sleepPropertyOneDay('2019/06/13', 'hoursSlept')).to.equal(4.1)
		});

		it('should show the sleep quality for a user on one specific day', function() {
			expect(newSleepUser.sleepPropertyOneDay('2019/06/13', 'sleepQuality')).to.equal(3.8)
		});
	});	

	describe('sleepPropertyOneWeek', function() {
		it('should show how many hours a user slept each day over a week', function() {
			expect(newSleepUser.sleepPropertyOneWeek('2019/06/15', '2019/06/21', 'hoursSlept')).to.eql([['2019/06/15', 6.1],['2019/06/16', 4.1],['2019/06/17', 8],['2019/06/18', 10.4],['2019/06/19', 10.7],['2019/06/20', 9.3],['2019/06/21', 7.8]])
		});

		it('should show a user\'s sleep quality each day over a week', function() {
			expect(newSleepUser.sleepPropertyOneWeek('2019/06/15', '2019/06/21', 'sleepQuality')).to.eql([['2019/06/15', 2.2],['2019/06/16', 3.8],['2019/06/17', 2.6],['2019/06/18', 3.1],['2019/06/19', 1.2],['2019/06/20', 1.2],['2019/06/21', 4.2]])
		});
	});

})

