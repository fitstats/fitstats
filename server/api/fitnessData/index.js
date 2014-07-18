'use strict';

var express = require('express');
var controller = require('./fitnessData.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.get('/:id/:date/*', auth.isAuthenticated(), controller.requestFitnessStat);

router.put('/:id/:date/*', auth.isAuthenticated(), controller.updateFitnessStat);



module.exports = router;
