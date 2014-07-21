'use strict';

var helper = require('./mfp-scraper');

module.exports.getMfpData = function(req, res){
  console.log('DATA FETCHING');
  var mfpId = req.params.mfpId;
  var reqDate = req.params.date;
  console.log('mfpId:', mfpId);
  console.log('reqDate:', reqDate);
  helper.scrapeMfpData(mfpId, reqDate, ['calories', 'protein', 'carbs', 'fat'], function(data){
    console.log('data fetched: ', data);

    return res.json({ data: data });
  });
};
