(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _httpRequest = require('./httpRequest');

var _httpRequest2 = _interopRequireDefault(_httpRequest);

var _chromeNotification = require('./chromeNotification');

var _chromeNotification2 = _interopRequireDefault(_chromeNotification);

var url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/' + 'PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP' + '?unique=2_33_1&segmentID=613&languageCode=pe';

function ParseEvents(evt) {
  evt.events.forEach(function (game) {
    console.log(game.CategoryName);
    console.log(game.EventName);
    console.log(game.EventPeriodName);
    console.log(game.SubCategoryName);
    //IsMatchClockRunning: true
    var gameResults = game.GameResults;
    console.log('score', gameResults[0].GameResultValue, gameResults[1].GameResultValue);
    var teamsOdds = game.MarketGroups[0].Markets[0].MarketSelections;
    teamsOdds.forEach(function (item) {
      console.log(item.MarketSelectionName, item.Odds);
    });
  });
}

function parseData(data) {
  var ongoingEvents = data.FetchLiveEventsMatchWinnerJSONPResult.OngoingEvents;
  ongoingEvents.map(function (ev) {
    return ParseEvents(ev);
  });
}

_httpRequest2['default'].send(url, function (response) {
  parseData(JSON.parse(response));
});

},{"./chromeNotification":2,"./httpRequest":3}],2:[function(require,module,exports){
"use strict";

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var httpRequest = {
  send: function send(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        cb(xhr.responseText);
      }
    };
    xhr.send();
  }
};

exports["default"] = httpRequest;
module.exports = exports["default"];

},{}]},{},[1]);
