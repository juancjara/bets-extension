console.log('loaded');
var url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP?unique=2_33_1&segmentID=613&languageCode=pe';

function httpRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      cb(xhr.responseText);
    }
  }
  xhr.send();
}

function ParseEvents(evt) {
  evt.events.forEach(function(game) {

    console.log(game.EventName);
    console.log(game.EventPeriodName);
    console.log(game.SubCategoryName);
    //IsMatchClockRunning: true
    var gameResults = game.GameResults;
    console.log('score', gameResults[0].GameResultValue,
                 gameResults[1].GameResultValue);
    var teamsOdds = game.MarketGroups[0].Markets[0].MarketSelections;
    teamsOdds.forEach(function(item) {
      console.log(item.MarketSelectionName, item.Odds);
    });
  })
}

function parseOngoingEvents(data) {
  var ongoingEvents = data.FetchLiveEventsMatchWinnerJSONPResult.OngoingEvents;
  ongoingEvents.map(function(ev) {
    return ParseEvents(ev);
  })
}

$('#btn').on('click', function() {
  httpRequest(url, function(data) {
    var parseData = JSON.parse(data);
    parseOngoingEvents(parseData);
  });
})

