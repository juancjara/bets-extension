import _ from 'lodash';
import httpRequest from './httpRequest';
import Notification from './chromeNotification';
import db from './db';
import alarm from './alarm';

const url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/' +
  'PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP' +
  '?unique=2_33_1&segmentID=613&languageCode=pe';

let gamesWithResults = function(game) {
  return game.GameResults && game.GameResults[0] &&
    game.GameResults[1].GameResultValue;
};

let calculateGameTime = function(game) {
  game.elapsedTime = _.floor(game.MatchClockSeconds / 60);
  return game;
};

let calculateResults = function(game) {
  game.results = [
    Number(game.GameResults[0].GameResultValue),
    Number(game.GameResults[1].GameResultValue)
  ];
  return game;
};

let extractOdds = function(game) {
  let teamsOdds = [];

  if (game.MarketGroups && game.MarketGroups[0] &&
      game.MarketGroups[0].Markets) {
    teamsOdds = game.MarketGroups[0].Markets[0]
      .MarketSelections.map(item => {
        return {
          team: item.MarketSelectionName,
          odds: item.Odds
        };
      });
  }
  game.teamsOdds = teamsOdds;
  return game;
};

let extractViewData = function(game) {
  return {
    id: game.EventId,
    categoryName: game.CategoryName,
    name: game.EventName,
    periodName: game.EventPeriodName,
    subCategoryName: game.SubCategoryName,
    gameResults: game.results,
    teamsOdds: game.teamsOdds,
    elapsedTime: game.elapsedTime
  };
};

let gameAlmostFinished = (game) => {
  return game.elapsedTime > 60;
};

let goalsDiffGreaterEqualThan = (results, diff) => {
  return Math.abs(results[0] - results[1]) >= diff;
};

let oddsWinnerGreaterThan = (teamsOdds, minOdd) => {
  return teamsOdds.filter(x => x.odds > minOdd).length > 0;
};

let shouldNotify = function(game) {
  if (!game.teamsOdds.length) return false;
  if (!game.categoryName !== 'Fútbol') return false;

  let betAnySide = game.teamsOdds.reduce((acc, item) => acc && item.odds >= 2.0,
                                         true);

  let gameAlmostOverAndWon = gameAlmostFinished(game) &&
    game.teamsOdss.length === 3;
    goalsDiffGreaterEqualThan(game.gameResults, 2) &&
    oddsWinnerGreaterThan(game.teamsOdds, 1.0);

  let goalsDiffGreaterThan3 = goalsDiffGreaterEqualThan(game.gameResults, 3) &&
    oddsWinnerGreaterThan(game.teamsOdds, 1.0);

  console.log(betAnySide, gameAlmostOverAndWon, goalsDiffGreaterThan3);
  return betAnySide || gameAlmostOverAndWon || goalsDiffGreaterThan3;
};

let notify= function({name, gameResults}) {
  Notification.create(`${name}, result: ${gameResults}`);
};

var launchNotifications = function(events, skips) {
  _.flatten(_.pluck(events, 'games'))
    .filter(game => !skips[game.id])
    .filter(shouldNotify)
    .forEach(notify);
};

function parseData(data) {
  let liveEvents = data.FetchLiveEventsMatchWinnerJSONPResult
                    .OngoingEvents;

  return liveEvents.map((ev) => {
    return {
      name: ev.name,
      games: ev.events
        .filter(gamesWithResults)
        .map(calculateResults)
        .map(calculateGameTime)
        .map(extractOdds)
        .map(extractViewData)
    };
  });
}

var cleanSkipped = function() {
  db.clean(() => {
    console.log('cleanSkipped');
  });
};

var getEvents = function () {
  httpRequest.send(url, (response) => {
    db.getListSkip((skips) => {
      let events = parseData(JSON.parse(response));
      launchNotifications(events, skips);
      db.updateGames(events, () => {});
    });
  });
};;

alarm.clearAll(()=> {
  alarm.create('fetchEvents', {when: Date.now() + 1000, periodInMinutes: 1},
         getEvents);
  alarm.create('cleanSkip', {when: Date.now() + 2000, periodInMinutes: 360},
             cleanSkipped);
  alarm.listen();
});
