import httpRequest from './httpRequest';
import Notification from './chromeNotification';
import db from './db';
import alarm from './alarm';

const url = 'https://sbfacade.bpsgameserver.com/PlayableMarketService/' +
  'PlayableMarketServicesV2.svc/jsonp/FetchLiveEventsMatchWinnerJSONP' +
  '?unique=2_33_1&segmentID=613&languageCode=pe';


function parseData(data, skips) {
  console.log('parsing');
  let liveEvents = data.FetchLiveEventsMatchWinnerJSONPResult
                    .OngoingEvents;
  let niceData = liveEvents.map(ev => {
    return {
      name: ev.name,
      events: ev.events.map(game => {
        let gameResults = 'Not yet';
        let shouldNotify = true;
        let shouldNotify2 = false;
        if (game.GameResults && game.GameResults[0] &&
            game.GameResults[1].GameResultValue ) {
          gameResults = game.GameResults[0].GameResultValue +
                         '-' + game.GameResults[1].GameResultValue;
          shouldNotify2 = game.GameResults[0].GameResultValue == 
                      game.GameResults[1].GameResultValue;
        }
        let teamsOdds = [{team: 'no', odds: 'hay'}];
        let odds = [];
        if (game.MarketGroups && game.MarketGroups[0] && 
            game.MarketGroups[0].Markets) {
          teamsOdds = game.MarketGroups[0].Markets[0]
                        .MarketSelections.map(item => { 
                          odds.push(item.Odds);
                          shouldNotify = shouldNotify && (item.Odds >= 3.0);
                          return {
                            team: item.MarketSelectionName,
                            odds: item.Odds
                          }
                        });
        }
        odds.sort().reverse();
        if (!skips[game.EventId] &&
             (shouldNotify || 
             (shouldNotify2 && odds[0] >= 2.0 && odds[1] >= 2.0 ) ) 
            ) {
          Notification.create(`${game.EventName}, result: ${gameResults}`)
        }
        return {
          id: game.EventId,
          categoryName: game.CategoryName,
          name: game.EventName,
          periodName: game.EventPeriodName,
          subCategoryName: game.SubCategoryName,
          gameResults,
          teamsOdds
        }
      })
    }
  });
  db.updateGames(niceData, () => {});
}

function getEvents() {
  httpRequest.send(url, (response) => {
    db.getListSkip((skips) => {
      parseData(JSON.parse(response), skips);
    })
  });
}

function cleanSkipped() {
  db.clean(() => {
    console.log('cleanSkipped');
  })
}

alarm.clearAll(()=> {
  alarm.create('fetchEvents', {when: Date.now() + 1000, periodInMinutes: 1},
         getEvents);  
  alarm.create('cleanSkip', {when: Date.now() + 2000, periodInMinutes: 360},
             cleanSkipped);
  alarm.listen();
})
