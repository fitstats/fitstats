'use strict';

var express = require('express');
var controller = require('./fitnessData.controller');

var router = express.Router();



router.get('/:id/:date/*', controller.requestFitnessStat);

router.put('/:id/:date/*', controller.updateFitnessStat);



module.exports = router;
