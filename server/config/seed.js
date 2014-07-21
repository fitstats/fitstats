/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var FitnessData = require('../api/fitnessData/fitnessData.model');

var userTest, userAdmin, fitnessDataTest1, fitnessDataTest2, fitnessDataAdmin3, fitnessDataAdmin4;

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

FitnessData.find({}).remove(function() {

  // delete previous users
  User.find({}).remove(function() {
    //create new
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test',
      mfpId: 'azey'
    }, function(err, newUser) {
        var userId = newUser._id;

        FitnessData.create({
          userId: userId,
          date: '20140718',
          weight: 12,
          bf: 4.5,
          hr: 12,
          bps: 12,
          bpd: 12,
          calories: 12,
          protein: 12,
          carbs: 12,
          fat: 12
        }, {
          userId: userId,
          date: '20140719',
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
          })
        });
    });
  });
});
