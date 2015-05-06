let httpRequest = {
  send(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        cb(xhr.responseText);
      }
    }
    xhr.send(); 
  }
}

export default httpRequest;