'use strict';

var helper = require('./mfp-scraper');

module.exports.getMfpData = function(req, res){
  var mfpId = req.params.mfpId;
  var reqDate = req.params.date;
  helper.scrapeMfpData(mfpId, reqDate, ['calories', 'protein', 'carbs', 'fat'], function(data){
    console.log(data);
    return res.json({ data: data, date: reqDate, user: mfpId});
  });
};
