function requestXHR(url) {
  return new Promise((resolve, reject) => {
  const req = new XMLHttpRequest();
  req.onload = () => {
  resolve(req.response);
  };
  req.onerror = () => {
  reject(req.statusText);
  };
  req.open('GET', url, true);
  req.responseType = 'json';
  req.send();
  });
  }
  
  
  function getData(value) {
  const urlData = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&type=video&part=snippet&maxResults=20&q=${value}`;
  
  return requestXHR(urlData)
  .then(((res) => {
  console.log(res);
  handleRequest(res.items)
  }),
  (err) => {
  window.console.log(err);
  });
  }
  
  function handleRequest(items) {
  (items || []).forEach(item => {
  const el = document.createElement('div');
  el.style.width = '200px';
  el.style.height = '400px';
  el.style.border= '1px solid gray';
  el.className = 'item-container';
  
  const title = document.createElement('h2');
  title.innerHTML = item.snippet.title;
   
  const body = document.createElement('div');
  body.style.width = '100%';
  body.style.height = '50%';
  body.innerHTML = `<div class='description'>${item.snippet.description}</div>`
  el.appendChild(title);
  el.appendChild(body);

  const thumbnails = document.createElement('div');
  thumbnails.innerHTML = `<div class='thumbnails'>${item.snippet.thumbnails}</div>`
  el.appendChild(thumbnails);

  const publishedAt = document.createElement('div');
  publishedAt.innerHTML = item.snippet.publishedAt;
  publishedAt.className = 'publishedAt';
  el.appendChild(publishedAt);


  search.appendChild(el);
  });
  }

  function look() {
    var el = document.getElementById('textToFind')
    getData(el.value);
     } 

  