'use strict';
module.change_code = 1;

var USER_DATA_TABLE_NAME = 'userData';
const rp = require('request-promise');

// connect to dynamo db
var credentials = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
};


function UserHelper() {}

// Get reward points
UserHelper.prototype.RewardPoints = function() {
  var options = {
    method: 'GET',
    uri: process.env.rewardsEndpoint,
    resolveWithFullResponse: true,
    headers: {
      'Authorization': process.env.auth
    },
    json: true,
    rejectUnauthorized: false
  };
  console.log(JSON.stringify(options));
  return rp(options);
}

module.exports = UserHelper;