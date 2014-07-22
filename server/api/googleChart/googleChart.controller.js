'use strict';

exports.retrieveSevenDaysGoogleChart = function(req, res){
	console.log("req.params: ", req.params);
	  //var requestDate = req.params.date;
	  var requestField= req.params.field;

	  //Testing seed.js Test User Seven days fitness data
	  FitnessData.find({
	    userId: req.user._id,
	    date: { $in: [
	        '20140721',
	        '20140720',
	        '20140719', 
	        '20140718',
	        '20140717',
	        '20140716', 
	        '20140715'
	    ]}
	}, function(err, userFitnessData){
	    var returnedData = {};
	    for (var i = 0; i < userFitnessData.length; i++) {
	      var singleDataDate = userFitnessData[i].date.slice(5, 6)
	                           + '-' +userFitnessData[i].date.slice(6);
	      var singleDataFieldValue = userFitnessData[i][requestField];
	      returnedData[singleDataDate] = singleDataFieldValue;
	    }
	    console.log("Find more than one :", returnedData);
	});
};