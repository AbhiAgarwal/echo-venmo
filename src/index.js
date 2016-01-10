/**
 * Examples:
 * One-shot model:
 *  User: "Alexa, request 10 dollars from Brenton."
 *  Alexa: "Requesting 10 dollars from Brenton."
 */

'use strict';

var AlexaSkill = require('./AlexaSkill');
var venmoLib = require('./venmo');

var APP_ID = undefined;

var VenmoHelper = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
VenmoHelper.prototype = Object.create(AlexaSkill.prototype);
VenmoHelper.prototype.constructor = VenmoHelper;

VenmoHelper.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechOutput = "Welcome to Alexa-Venmo. A sample question would be Alexa, request 10 dollars from Brenton ... Now, what can I help you with.";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "For instructions on what you can say, please say help me.";
    response.ask(speechOutput, repromptText);
};

VenmoHelper.prototype.intentHandlers = {
    RequestMoneyIntent: function (intent, session, response) {
        var personName = intent.slots.Person.value.toLowerCase();
        var amountValue = intent.slots.Amount.value;
        var cardTitle = "Venmo charge for " + personName;
        if (personName) {
            var status = venmoLib.chargePerson(personName, amountValue);
            response.tellWithCard(personName, cardTitle, personName);
        } else {
            response.ask("I'm sorry, I currently do not know " + personName + ". What else can I help with?", "What else can I help with?");
        }
    },
    HelpIntent: function (intent, session, response) {
        var cardTitle = intent.name;
        var speechOutput = "You can ask questions about Alexa-Venmo. Now, what can I help you with?";
        var repromptText = "A sample question would be Alexa, request 10 dollars from Brenton... Now, what can I help you with?";
        response.ask(speechOutput, repromptText);
    }
};

exports.handler = function (event, context) {
    var venmoHelper = new VenmoHelper();
    venmoHelper.execute(event, context);
};