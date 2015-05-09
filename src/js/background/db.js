import localforage from 'localforage';

const appName = 'betsson-ext'

function formatKey(val) {
  return `${appName}-${val}`;
}

const keys = {
  LAST_UPDATE: formatKey('lastUpd'),
  GAMES: formatKey('games')
}

const db = {
  updateGames(games, cb) {
    var data = {}
    data[keys.GAMES] = games;
    chrome.storage.local.set(data, cb);
  },
  getGames(cb) {
    chrome.storage.local.get(keys.GAMES, (data) => {
      cb(data[keys.GAMES]);
    });
  }
}

export default db;