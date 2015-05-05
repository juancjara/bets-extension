(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('loaded');
var url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP?unique=2_33_1&segmentID=613&languageCode=pe';

function httpRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      cb(xhr.responseText);
    }
  };
  xhr.send();
}

function parseOngoingEvents(data) {
  var ongoingEvents = parseData.FetchLiveEventsMatchWinnerJSONPResult.OngoingEvents;
}

$('#btn').on('click', function () {
  httpRequest(url, function (data) {
    var parseData = JSON.parse(data);
    parseOngoingEvents(data);
  });
});

},{}]},{},[1]);
