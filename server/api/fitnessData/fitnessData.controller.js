'use strict';

var FitnessData = require('./fitnessData.model');
var User = require('../user/user.model');

/*
*Function requestOneDayFitnessStat, response ond day fitnessdata from database
*/
exports.requestOneDayFitnessStat = function(req, res){

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
*Function requestFitnessStat, response specific field of fitnessdata from database
*For example: request weight field of Date 07182014
*/
exports.requestFitnessStat = function(req, res) {
  var reqestDate = req.params.date;
  var data = req.params.data;

  //fetch data from database
  //your code here....:)


  //send response
  res.json({data: data, field: dataRequested});
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

    console.log('Find FitnessData: ', userFitnessData);

    // if the date exists
    if (userFitnessData) {

      //update userFitnessData model and save
      userFitnessData[updateField] = newStat;
      userFitnessData.save();

    } else {//if the date does not exist, meaning a new date is being updated

      //create newFitnessObj
      var newFitnessObj = {};
      newFitnessObj.userId = userId;
      newFitnessObj.date   = updateDate;
      newFitnessObj[updateField] = newStat;

      //create a new FitnessData model
      FitnessData.create(newFitnessObj);
    }
      //send response and return updated data
      return res.json({data: data});

  });
};
