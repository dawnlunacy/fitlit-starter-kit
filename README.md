# FitLit Starter Kit

This is the first partner project of Mod Two at Turing School Of Software and Design located in Denver, Colorado. 
Timeline for the project to be completed is one week.  The details of this project are outlined in [this project spec](http://frontend.turing.io/projects/fitlit.html).

This is a collaboration from:
* Lacy Rudd  [github account](https://github.com/dawnlunacy)
*David A. Gitlen [github account](https://github.com/davidagitlen)

(Github Pages Link)()
(Github Repository Link)(https://github.com/dawnlunacy/fitlit-starter-kit/)
## Summary

1. The learning goals and objectives for this project are as follows: 
* Follow the specification below to make a working application
* Implement ES6 classes that communicate to each other as needed
* Write modular, reusable code that follows SRP (Single Responsibility Principle)
* mplement a robust testing suite using TDD
* Use object and array prototype methods to perform data manipulation
* Display information on the page while maintaining ability to test class properties and methods
* Create a data dashboard that is easy to use and displays information in a clear way

* In this project, you will be given data from an activity tracker for many users over many days. Think of something like Fitbit. Fitbit devices log data and present it on a dashboard for their users. Your goal is to present a useful dashboard for a user to view and see their latest activity data, goals, and milestones.

## Testing

1. This project implements Test Driven Development written by the collaborators. We used the `mocha` and `chai` libraries to complete testing.

## Linting Your Code

1. This project implements the use of a linter. 

## Data Model

1. This project is the first project through the Turing Front End Engineering Program to implement large data files. Below is a preview of how they are set up.
**Users**

```
[
  {
    "id": [number],
    "name": [string],
    "address": [string],
    "email": [string],
    "strideLength": [number - feet],
    "dailyStepGoal": [number - steps],
    "friends": [array - one-way connection to other user(s)]
  },
  ...more user data
]
```

**Activity**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numSteps": [number - steps],
    "minutesActive": [number - minutes],
    "flightsOfStairs": [number - flights]
  },
  ...more activity data
]
```

**Hydration**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "numOunces": [number - ounces]
  },
  ...more hydration data
]
```

**Sleep**

```
[
  {
    "userID": [number],
    "date": [string YYYY/MM/DD],
    "hoursSlept": [number - hours],
    "sleepQuality": [number - unitless]
  },
  ...more sleep data
]
```

## Packages

1. FitLit uses [Packery](https://packery.metafizzy.co/) to bring to the user a masonry layout of data. 
1. FitLit also uses [Dragabilly](https://draggabilly.desandro.com/) to allow the user a draggable interface to customize their DOM experience. 
1. To display the data on graphs FitLit implements [charts.js](https://www.chartjs.org/).

## User-Interface 
1. This is also the first project at Turing where a prompt for the UI/UX design is not provided. We were allowed the creative freedom to design this. The DOM does not represent the full depth of functionality found inside our code. 

## Demo
    ![FitLit Demo](../images/demo/FitLit-demo.gif)
    
    



