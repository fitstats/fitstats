'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

// FitnessDataSchema
// 	.pre('save', function(next) {
// 		next();
// 	})

module.exports = mongoose.model('FitnessData', FitnessDataSchema);

