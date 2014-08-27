'use strict';

// Development specific configuration
// ==================================
module.exports = {
  //seedDB with test data
  seedDB: true,
  
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/fitstats-dev'
  }
};
