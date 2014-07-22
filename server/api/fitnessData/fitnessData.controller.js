'use strict';

var FitnessData = require('./fitnessData.model');
var User = require('../user/user.model');


exports.requestSevenDaysFitnessStat = function(req, res){
  console.log("req.params: ", req.params);
  var requestDate = req.params.date;
  var requestField= req.params.field;

  // Find one day's FitnessData based on userId and date.
  // FitnessData.findOne({userId: req.user._id, date: requestDate}, function (err, userFitnessData) {

  //   if (err) { return res.send(500, err); }

  //   //Find data, send response
  //   console.log('@@@@@@@@@@@@Find FitnessData: ', userFitnessData[requestData]);
  //   // temp- data: userFitnessData[requestData]
  //   var returnObject = {};
  //   // store each day data into object
  //   returnObject.date = userFitnessData[requestData];
     
  //   // var year = refreshedDate.slice(0, 4);
  //   // var month = (refreshedDate.slice(4, 6) -1);
  //   // var day = refreshedDate.slice(6);
  //   // var newDate = new Date(year, month, day);


  //   console.log('#######returnObject is ', returnObject);
  //   res.json(returnObject);

  // });

  
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


/*
*Find more than one : [ { _id: 53cdc9a9184a5800000818f0,
    userId: 53cdc9a9184a5800000818ee,
    date: '20140719',
    weight: 181,
    bf: 4.6,
    hr: 101,
    bps: 121,
    bpd: 81,
    calories: 2401,
    protein: 181,
    carbs: 336,
    fat: 66,
    __v: 0 },
  { _id: 53cdc9a9184a5800000818f1,
    userId: 53cdc9a9184a5800000818ee,
    date: '20140720',
    weight: 180,
    bf: 4.5,
    hr: 100,
    bps: 120,
    bpd: 80,
    calories: 2400,
    protein: 180,
    carbs: 335,
    fat: 65,
    __v: 0 },
  { _id: 53cdc9a9184a5800000818f2,
    userId: 53cdc9a9184a5800000818ee,
    date: '20140721',
    weight: 179,
    bf: 4.4,
    hr: 99,
    bps: 119,
    bpd: 80,
    calories: 2401,
    protein: 181,
    carbs: 335,
    fat: 66,
    __v: 0 } ]
*/

/*
*Function requestOneDayFitnessStat, response ond day fitnessdata from database
*/
exports.requestOneDayFitnessStat = function(req, res) {

  var requestDate = req.params.date;

  //Find one day's FitnessData based on userId and date.
  FitnessData.findOne({userId: req.user._id, date: requestDate}, function (err, userFitnessData) {

    if (err) { return res.send(500, err); }

    //Find data, send response
    console.log('Find FitnessData: ', userFitnessData);
    res.json({data: userFitnessData});

  });
};



/*
*Function updateFitnessStat, first update database of specific data and then return updated data
*/
exports.updateFitnessStat = function(req, res) {
  var userId      = req.user._id;
  var data        = req.body;
  var updateDate  = String(data.date);
  var updateField = data.field;
  var newStat     = data.data;

  //Find one day's FitnessData based on userId and date.
  FitnessData.findOne({userId: userId, date: updateDate}, function (err, userFitnessData) {
    if (err) { return res.send(500, err); }

    console.log('Find & update FitnessData: ', userFitnessData);

    // if the date exists
    if (userFitnessData) {

      // case for single field input
      if (updateField !== 'multifields') {
        // update userFitnessData model and save
        userFitnessData[updateField] = newStat;
        userFitnessData.save();

      // case for multifield input within an object
      } else {
        for(var key in newStat) {
          userFitnessData[key] = newStat[key];
        }
        userFitnessData.save();
      }

    //if the date does not exist, meaning a new date is being created
    } else {

      //create newFitnessObj
      var newFitnessObj = {};
      newFitnessObj.userId = userId;
      newFitnessObj.date   = updateDate;

      // update with single field property
      if (updateField !== 'multifields') {
        newFitnessObj[updateField] = newStat;

      // extend with multifields passed into request
      } else {
        for(var field in newStat) {
          newFitnessObj[field] = newStat[field];
        }
      }

      //create a new FitnessData model
      FitnessData.create(newFitnessObj);

    }
    //send response and return updated data
    return res.json({data: data});
  });
};
