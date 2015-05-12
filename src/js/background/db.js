import localforage from 'localforage';
import moment from 'moment';

const appName = 'betsson-ext';

function formatKey(val) {
  return `${appName}-${val}`;
}

const keys = {
  LAST_UPDATE: formatKey('lastUpd'),
  SKIPPED: formatKey('skipped')
}

let db = {
  updateGames(games, cb) {
    var data = {};
    data[keys.LAST_UPDATE] = {
      games: games,
      time: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    chrome.storage.local.set(data, cb);
  },
  addSkipped(id, cb) {
    db.getData(keys.SKIPPED, (data = {}) => {
      data[id] = (new Date()).getTime();
      console.log('added', data);
      chrome.storage.local.set(data, cb);
    });
  },
  getGames(cb) {
    db.getData(keys.LAST_UPDATE, cb);
  },
  getData(key, cb) {
    chrome.storage.local.get(key, cb);
  }
};


/*,
  getGames(cb) {
    //db.getData(keys.LAST_UPDATE, cb);
  },
  clean(cb) {
    //db.getData(keys.SKIPPED, cb);
  }
*/

export default db;