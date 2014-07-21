'use strict';

var express = require('express');
var controller = require('./fitnessData.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:date', auth.isAuthenticated(), controller.requestOneDayFitnessStat);

/*
*Comment: This route can be used when fetching specific data, see requestFitnessStat function
*/
//router.get('/:id/:date/*', auth.isAuthenticated(), controller.requestFitnessStat);

router.put('/:date/*', auth.isAuthenticated(), controller.updateFitnessStat);



module.exports = router;
