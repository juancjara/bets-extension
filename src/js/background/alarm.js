let alarm = {
  actions: {},
  create(name, alarmInfo, fn) {
    chrome.alarms.create(name, alarmInfo);
    alarm.actions[name] = fn;
  },
  listen() {
    chrome.alarms.onAlarm.addListener(elem => { 
      alarm.actions[elem.name]();
    });
  },
  clearAll(done) {
    chrome.alarms.clearAll(done);
  }
}

export default alarm;