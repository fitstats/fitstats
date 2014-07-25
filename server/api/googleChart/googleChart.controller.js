'use strict';
var FitnessData = require('../fitnessData/fitnessData.model');

// Creates a js date based on the urlDate string
var makeFirstDay = function( date ) {
  var year = date.slice( 0, 4 );
  var month = date.slice( 4, 6 );
  var day = date.slice( 6 );

  return new Date( month + '/' + day + '/' + year );
};

// Creates an array of the past 7 days urlDate strings
var sevenDays = function( firstDay ) {
  var lastDay = firstDay ? makeFirstDay( firstDay ) : new Date();
  var counter = 0;
  var days = [];

  var addZero = function( number ) {
    return number < 10 ? '0' + number : number;
  };

  while( counter < 7 ) {
    var stringDate = 
      '' + lastDay.getFullYear() +
      ( addZero( lastDay.getMonth() + 1 ) ) +
      addZero( lastDay.getDate() );

    days.push( stringDate );
    lastDay = new Date( lastDay.setDate( lastDay.getDate() - 1 ) );
    counter++;
  }

  return days;
};

// Retrieves the last 7 days FitnessData models from the database
exports.retrieveSevenDaysGoogleChart = function(req, res) {
  var requestField = req.params.field;
  var requestDate = req.params.date ? sevenDays( req.params.date ) : sevenDays();

  FitnessData.find({
    userId: req.user._id,
    date: { $in: requestDate }
  }, function (err, userFitnessData) {

    if (err) { return res.send(500, err); }

    //Find data, send response
    console.log('Find Each Day FitnessData: ', userFitnessData);
    res.json({data: userFitnessData});

  });

};