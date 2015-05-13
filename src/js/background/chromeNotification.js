let Notification = {
  create(message) {
    let id = '' + (new Date()).getTime();
    chrome.notifications.create(id, {
      type: 'basic',
      iconUrl: 'gcm_128.png',
      title: 'Betsson', 
      message
    }, () => {});
  }
}

export default Notification;