'use strict';

var express = require('express');
var controller = require('./googleChart.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:field', auth.isAuthenticated(), controller.retrieveSevenDaysGoogleChart);

module.exports = router;
