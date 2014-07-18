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
  fitnessDataTest1 = new FitnessData({
    date: "20140717",
    weight: 100,
    bf: 4.5,
    hr: 100,
    bps: 120,
    bpd: 80,
    calories: 2400,
    protein: 180,
    carbs: 335,
    fat: 65
  });
  fitnessDataTest1.save();
  fitnessDataTest2 = new FitnessData({
    date: "20140716",
    weight: 110,
    bf: 4.0,
    hr: 110,
    bps: 123,
    bpd: 85,
    calories: 2450,
    protein: 150,
    carbs: 200,
    fat: 63
  });
  fitnessDataTest2.save();
  fitnessDataAdmin3 = new FitnessData({
    date: "20140717",
    weight: 101,
    bf: 4.5,
    hr: 100,
    bps: 120,
    bpd: 80,
    calories: 2400,
    protein: 180,
    carbs: 335,
    fat: 65
  });
  fitnessDataAdmin3.save();
  fitnessDataAdmin4 = new FitnessData({
    date: "20140716",
    weight: 111,
    bf: 4.0,
    hr: 110,
    bps: 123,
    bpd: 85,
    calories: 2450,
    protein: 150,
    carbs: 200,
    fat: 63
  });
  fitnessDataAdmin4.save();
});  

User.find({}).remove(function() {
  userTest = new User({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
  });
  userTest.fitnessData.push(fitnessDataTest1.toObject(), fitnessDataTest2.toObject());
  userTest.save();
  userAdmin = new User({
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
  });
  userAdmin.fitnessData.push(fitnessDataAdmin3.toObject(), fitnessDataAdmin4.toObject());
  userAdmin.save();

});