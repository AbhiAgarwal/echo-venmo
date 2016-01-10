'use strict';
var Venmo = require('venmo')
  , venmo = new Venmo('', '');

// Figure out better method for lookup
var friends = {
    'James': 'a@b.com'
}

function chargePerson (name, amount) {
    if (!name in friends) {
        return false;
    }
    var friend = {
        "emails": friends[name],
        "amount": amount
    };

    venmo.pay(friend, function (error, link) {
      if (error) {
        console.log(error);
        return false;
      } else {
        // Follow URL if you want to be charged
        console.log(link);
        return true;
      }
    });
}