const chai = require('chai');
const expect = chai.expect;

const ActivityRepository = require('../src/ActivityRepository.js');
const mockActivityData = require('../mock-data/mock-activity.js');
const mockUsers = require('../mock-data/mock-users.js');

let newActivityUserRepo;

describe('ActivityRepository', function() {
  beforeEach(function() {
    newActivityUserRepo = new ActivityRepository(mockActivityData, 1, mockUsers);
  });

  it('should be a function', function() {
    expect(ActivityRepository).to.be.a('function')
  });

  it('should be an instance of ActivityRepository', function() {
    expect(newActivityUserRepo).to.be.an.instanceOf(ActivityRepository)
  });

  describe('minutesActiveWeekAverage', function() {
    it('should return the average minutes active for a user over a given week', function() {
      expect(newActivityUserRepo.minutesActiveWeekAverage('2019/06/15', '2019/06/21')).to.equal(171)
    });
  });

  describe('exceedStepGoal', function () {
    it('should return the days the user exceeded their step goal', function() {
      expect(newActivityUserRepo.exceedStepGoal()).to.eql(['2019/06/17', '2019/06/20', '2019/06/22'])
    });
  });

  describe('usersAverage', function() {
    it('should return the average stairs climbed for a specific date for all users', function() {
      expect(newActivityUserRepo.usersAverage('2019/06/18', 'flightsOfStairs')).to.equal(32)
    });

    it('should return the average steps taken for a specific date for all users', function() {
      expect(newActivityUserRepo.usersAverage('2019/06/18', 'numSteps')).to.equal(4541)
    });

    it('should return the average minutes active for a specific date for all users', function() {
      expect(newActivityUserRepo.usersAverage('2019/06/18', 'minutesActive')).to.equal(173)
    });
  });

});