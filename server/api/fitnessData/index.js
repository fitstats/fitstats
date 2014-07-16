'use strict';

var express = require('express');
var controller = require('./fitnessData.controller');

var router = express.Router();

router.get('/weight', controller.getWeight);
router.put('/weight', controller.updateWeight);

module.exports = router;






// /api/userData/1234/20130918/bf
// req.params('userId')
// req.params('date')
