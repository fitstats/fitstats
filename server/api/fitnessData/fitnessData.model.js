'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//create FitnessDataSchema
var FitnessDataSchema = new Schema({
  'userId': Schema.ObjectId,
  'date': String,
  'weight': Number,
  'bf': Number,
  'hr': Number,
  'bps': Number,
  'bpd': Number,
  'calories': Number,
  'protein': Number,
  'carbs': Number,
  'fat': Number
});

module.exports = mongoose.model('FitnessData', FitnessDataSchema);
