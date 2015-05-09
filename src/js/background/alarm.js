let alarm = {
  create(name, alarmInfo, cb) {
    chrome.alarms.create(name, alarmInfo);
    chrome.alarms.onAlarm.addListener(cb);
  }  
}

export default alarm;