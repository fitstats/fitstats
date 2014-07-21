/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var FitnessData = require('../api/fitnessData/fitnessData.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});


/*
*Create Test user and Admin user model instances 
*/
FitnessData.find({}).remove(function() {

  //Delete previous users model instance
  User.find({}).remove(function() {
    //Create new User model instance
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, function(err, newUser) {

      //UserId holds newUser's id. (Tips: "var userId = newUser.id" works also.)
      var userId = newUser._id
      
      //Create two FinessData model instances
      FitnessData.create({
        userId: userId,
        date: '20140719',
        weight: 181,
        bf: 4.6,
        hr: 101,
        bps: 121,
        bpd: 81,
        calories: 2401,
        protein: 181,
        carbs: 336,
        fat: 66
      }, {
        userId: userId,
        date: '20140720',
        weight: 180,
        bf: 4.5,
        hr: 100,
        bps: 120,
        bpd: 80,
        calories: 2400,
        protein: 180,
        carbs: 335,
        fat: 65
      },{
        userId: userId,
        date: '20140721',
        weight: 179,
        bf: 4.4,
        hr: 99,
        bps: 119,
        bpd: 80,
        calories: 2401,
        protein: 181,
        carbs: 335,
        fat: 66
      }, function(err, fitnessData) {
        FitnessData.find({userId: userId}, function(err, data) {
          console.log('Fitnessdata', data);
        })
      });
    });

    //Create new Admin model instance
    User.create({
      provider: 'local',
      name: 'Admin User',
      email: 'admin@admin.com',
      password: 'admin'
    }, function(err, newUser) {

      //UserId holds newUser's id. (Tips: "var userId = newUser.id" works also.)
      var userId = newUser._id
      
      //Create two FinessData model instances
      FitnessData.create({
        userId: userId,
        date: '20140719',
        weight: 183,
        bf: 4.8,
        hr: 103,
        bps: 123,
        bpd: 83,
        calories: 2403,
        protein: 183,
        carbs: 338,
        fat: 68
      }, {
        userId: userId,
        date: '20140720',
        weight: 182,
        bf: 4.7,
        hr: 102,
        bps: 122,
        bpd: 82,
        calories: 2402,
        protein: 182,
        carbs: 337,
        fat: 67
      },{
        userId: userId,
        date: '20140721',
        weight: 180,
        bf: 4.5,
        hr: 100,
        bps: 120,
        bpd: 80,
        calories: 2400,
        protein: 180,
        carbs: 335,
        fat: 65
      }, function(err, fitnessData) {
        FitnessData.find({userId: userId}, function(err, data) {
          console.log('Fitnessdata', data);
        })
      });
    });
  });
});