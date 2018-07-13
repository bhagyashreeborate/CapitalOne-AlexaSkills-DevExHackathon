'use strict';
var alexa = require('alexa-app'); //require alexa app

module.change_code = 1;
var app = new alexa.app('devex-hack');
var DatabaseHelper = require('./database_helper');
var databaseHelper = new DatabaseHelper();


// Launch Request
app.launch(function(req, res) {
  var prompt = "Hi there! Please tell me your 4 digit login pin.";
  res.say(prompt).shouldEndSession(false).send();
});


// Intent for Verifying User Login Pin
// TBI [verify if pin is same as the one in db]
app.intent('verifyLoginPin', {
  'slots': {
    'Digits': 'AMAZON.FOUR_DIGIT_NUMBER'
  }
}, function(req, res) {
  var prompt = '<audio src="https://s3.amazonaws.com/alexa-audiobook/75235__creek23__cha-ching.mp3"/> Hi Bobby! What can I do for you? You can ask me to add a goal, check what your goals are and check your reward points. Now, What would you like to know?'
  res.say(prompt).shouldEndSession(false);
});


// Add Goal Intent
// TBI [create a list and save goals]
app.intent('addGoal', {
  "slots": {
    "Status": "LITERAL",
  }
}, function(req, res) {
  var status = req.slot('Status').toLowerCase();
  console.log('variable slot', status)
  switch (status) {

    case 'i would like to add a goal':
    case 'add a goal':
      res.say('Okay. You would like to add a goal. What type of goal would you like to add? You can say things like - rewards goal, budget goal. What will it be?').shouldEndSession(false);
      break;

    case 'rewards goal':
    case 'rewards goals':
    case 'reward goals':
    case 'reward goal':
      res.say('Sure! What goal would you like to add under reward goals?').shouldEndSession(false);
      break;

    case 'buy a playstation next month':
    case 'add buy a playstation next month':
      res.say('I have added - buy a playstation next month, to your list of rewards goal. The average price of a playstation is USD 279. You need 200 more points to redeem for a playstation. Now, Is there anything else I can help you with?').shouldEndSession(false);
      break;

    case 'what are my goals':
      res.say('Your current goals are to pay for college which is USD 5,000 and to buy a playstation next month.').shouldEndSession(true);
      break;

    default:
      res.say("sorry, i did not understand that. can you please repeat it?").shouldEndSession(false);
  }
});


// check for reward points intent
app.intent('checkRewardPoints', {
  "slots": {
    "Speech": "LITERAL",
  }
}, function(req, res) {
  var status = req.slot('Speech').toLowerCase();
  var aa = databaseHelper.RewardPoints();
  return aa.then(function(result) {
    switch (status) {

      case 'how many reward points do i have':
        res.say('You have ' + result.body.rewardsBalance + ' points now. I can suggest what you can buy from your goal list with these reward points. Would you like to hear?').shouldEndSession(false);
    }
  })
});


// AMAZON YES Intent
app.intent('AMAZON.YesIntent',
  function(req, res) {
    var prompt = 'I would suggest you to pay for college first and then buy a play station later. Oh! and, there is an offer next month at Target where you can buy a playstation with the remainder of your points.';
    res.say(prompt).shouldEndSession(true);
  }
);


// AMAZON NO Intent
app.intent('AMAZON.NoIntent',
  function(req, res) {
    var response = "Okay. Thanks.";
    res.say(response).shouldEndSession(true);
  }
);


// Help Intent
app.intent('AMAZON.HelpIntent',
  function(req, res) {
    var help = "You can say - add a goal, how many reward points do I have? Now, what can I do for you?";
    res.say(help).shouldEndSession(false);
  }
);


// Stop Intent
app.intent('AMAZON.StopIntent',
  function(req, res) {
    var goodbye = "Had a nice time talking to you. Goodbye.";
    res.say(goodbye).shouldEndSession(true);
  }
);


module.exports = app;