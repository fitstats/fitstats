'use strict';

var express = require('express');
var controller = require('./fitnessData.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:date', auth.isAuthenticated(), controller.requestOneDayFitnessStat);

router.get('/:date/:field', auth.isAuthenticated(), controller.requestSevenDaysFitnessStat);

router.put('/:date/*', auth.isAuthenticated(), controller.updateFitnessStat);



module.exports = router;
