import localforage from 'localforage';
import moment from 'moment';

const appName = 'betsson-ext';

function formatKey(val) {
  return `${appName}-${val}`;
}

const keys = {
  LAST_UPDATE: formatKey('lastUpd'),
}

const db = {
  updateGames(games, cb) {
    var data = {};
    data[keys.LAST_UPDATE] = {
      games: games,
      time: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    
    chrome.storage.local.set(data, cb);
  },
  getGames(cb) {
    chrome.storage.local.get(keys.LAST_UPDATE, (data) => {
      cb(data[keys.LAST_UPDATE]);
    });
  }
}

export default db;