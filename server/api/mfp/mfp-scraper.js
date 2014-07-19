'use strict';

var request = require('request');
var cheerio = require('cheerio');

//Take a string, remove commas, and convert to 'number' data type
var convertToNum = function(string){
  return parseInt(string.split(',').join(''));
};

//Receive MyFitnessPal userID and date and return URL for page to scrape data from
var mfpUrl = function(userId, date){
  date = date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,8);
  return 'http://www.myfitnesspal.com/food/diary/' +
         userId +
         '?date=' +
         date;
};


//scrapeMfpData takes:
// 1. mfpUserId (for setting MyFitnessPal URL)
// 2. date (for setting MyFitnessPal URL) in STRING format YYYYMMDD eg. '20140708'
// 2. options array that contains desired data fields
// 3. callback, which has access to object in this format:
//      {field1: number, field2: number, field3: number, etc...}

// USAGE EXAMPLES:

// scrapeMfpData('azey47', '20140708', ['calories', 'protein', 'carbs', 'fat'], function(data){
//   console.log(data);
//   // do stuff with data like store in database, serve back to client, etc.
// });
//
// scrapeMfpData('arthurzey', '20140710', ['calories', 'protein', 'carbs', 'fat', 'sat fat', 'fiber'], function(data){
//   console.log(data);
//   // do stuff with data like store in database, serve back to client, etc.
// });

module.exports.scrapeMfpData = function(mfpUserId, date, options, callback) {
  //get MyFitnessPal URL (eg. 'http://www.myfitnesspal.com/food/diary/azey47?date=2014-07-08')
  var url = mfpUrl(mfpUserId, date);

  //GET request the MFP URL (this will pass HTML to the callback in the 'body' argument)
  request(url, function(err, resp, body){
    if (err) throw err;

    //load DOM using cheerio (for jquery-like selectors)
    var $ = cheerio.load(body);
    // console.log(body);

    //set fields to be scraped
    var fields = {};
    options.forEach(function(field){
      fields[field] = true;
    });

    //define variables for determining columns and values of fields on MFP page
    var fieldCols = {};
    var fieldData = {};

    //find and set column numbers of desired fields
    $('tfoot').find('tr').find('td').each(function(index, element){
      var $element = $(element);
      var field = $element.text().toLowerCase();

      if ( fields[field] ) {
      fieldCols[field] = index;
      }
    });

    //find row in MFP with nutrient totals
    var $dataRow = $('tr.total:not(.alt, .remaining)');

    //get data for each field
    for (var field in fieldCols) {
      var col = fieldCols[field] + 1; //because nth-child selector is 1-indexed, not 0-indexed

      if ( fields[field] ) {
        var mfpData = $dataRow.find('td:nth-child(' + col + ')').text();
        fieldData[field] = convertToNum(mfpData);
      }
    }
    console.log(url);
    callback(fieldData);
  });
};
