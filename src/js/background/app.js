import httpRequest from './httpRequest';

const url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/' +
  'PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP' +
  '?unique=2_33_1&segmentID=613&languageCode=pe';

function ParseEvents(evt) {
  evt.events.forEach(function(game) {
    console.log(game.CategoryName);
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

function parseData(data) {
  var ongoingEvents = data.FetchLiveEventsMatchWinnerJSONPResult.OngoingEvents;
  ongoingEvents.map(function(ev) {
    return ParseEvents(ev);
  })
}

httpRequest.send(url, (response) => {
  parseData(JSON.parse(response));
});