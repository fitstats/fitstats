'use strict';

var express = require('express');
var controller = require('./mfp.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:mfpId/:date', auth.isAuthenticated(), controller.getMfpData);

module.exports = router;
