'use strict';

var FitnessData = require('./fitnessData.model');
var User = require('../user/user.model');

exports.requestOneDayFitnessStat = function(req, res){
  var requestDate = req.params.date;

  FitnessData.findOne({userId: req.user._id, date: requestDate}, function (err, userFitnessData) {
    if (err) { return res.send(500, err); }

    // console.log('userFitnessData returned by promise: ', userFitnessData);

    res.json({data: userFitnessData});
  });

};


exports.requestFitnessStat = function(req, res) {
  // var dataRequested = req.params['0'];
  // var reqDate       = req.params['date'];
  // var foundDate     = false;
  // var temp;
  //
  // User.findById(req.params['id'], function(err, user){
  //   if (err) return next(err);
  //
  //   if (user.fitnessData.length === 0){
  //     res.send(204);
  //   } else {
  //     user.fitnessData.forEach(function(value, index, array){
  //       if(value['date'] === reqDate){
  //         foundDate = true;
  //         temp = value[dataRequested];
  //         return;
  //       }
  //     });
  //     if (foundDate){
  //       res.json({data: temp, field: dataRequested});
  //     } else {
  //       console.log("Client side: No data for today, please enter data.")
  //       res.send(204);
  //     }
  //   }
  // });
};


exports.updateFitnessStat = function(req, res) {
  var userId      = req.user._id;
  var data        = req.body;
  var updateDate  = String(data.date);
  var updateField = data.field;
  var newStat     = data.data;

  FitnessData.findOne({userId: userId, date: updateDate}, function (err, userFitnessData) {
    if (err) { return res.send(500, err); }

    console.log('userFitnessData returned by promise: ', userFitnessData);
    if (userFitnessData) {
      /* day exists */
      userFitnessData[updateField] = newStat;
      userFitnessData.save();

    } else {
      /* day does not exist - create new date object to be stored */
      var newFitnessObj = {};
      newFitnessObj.userId = userId;
      newFitnessObj.date   = updateDate;
      newFitnessObj[updateField] = newStat;

      FitnessData.create(newFitnessObj);
    }
      return res.json({data: data});

  });
};


/*
  console.log('GET req: ', req.params);
  req.params=>   { '0': 'weight',
    id: '53c6c52f9fc87084680be124',
    date: '20140716'
  }

  console.log('PUT req: ', req.body)
  req.body => {
    userId: '53c6c52f9fc87084680be124',
    date: '20140716',
    field: 'weight',
    data: '100.0'
  }
*/
