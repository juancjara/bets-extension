import localforage from 'localforage';
import moment from 'moment';

const appName = 'betsson-ext';

function formatKey(val) {
  return `${appName}-${val}`;
}

const keys = {
  LAST_UPDATE: formatKey('lastUpd'),
  SKIPPED: formatKey('skipped')
};

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
      let params = {};
      params[keys.SKIPPED] = data;
      chrome.storage.local.set(params, cb);
    });
  },

  getListSkip(cb) {
    db.getData(keys.SKIPPED, (list = {}) => {
      cb(list);
    });
  },
  removeSkipped(id, cb) {
    db.getData(keys.SKIPPED, (data) => {
      delete data[id];
      let params = {};
      params[keys.SKIPPED] = data;
      chrome.storage.local.set(params, cb);
    })
  },
  getGames(cb) {
    db.getData(keys.LAST_UPDATE, cb);
  },
  getData(key, cb) {
    chrome.storage.local.get(key, (data) => {
      cb(data[key]);
    });
  },
  clean(cb) {
    db.getData(keys.SKIPPED, (data) => {
      let toDelete = [];
      let now = (new Date()).getTime();
      let maxDiff = 1000 * 60 * 60 * 6;
      for (var k in data) {
        if (now - data[k] > maxDiff) {
          toDelete.push(k);
        }
      }

      toDelete.map((id) => {
        delete data[id];
      })

      let params = {};
      params[keys.SKIPPED] = data;
      chrome.storage.local.set(params, cb);
    })
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
