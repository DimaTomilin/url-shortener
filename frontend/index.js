const usernameInput = document.getElementById('username-area');

document.getElementById('sing-in-button').addEventListener('click', userSingIn);
document.getElementById('check-button').addEventListener('click', checkUser);

async function userSingIn() {
  const username = usernameInput.value.toLowerCase();
  localStorage.setItem('username', username);

  const response = await fetch(
    `http://localhost:3000/user/create/${username}`,
    {
      method: 'PUT',
    }
  );
  const body = await response.text();
  showingAlert(document.getElementById('alert1'), response.status, body);
  usernameInput.value = '';
}

async function checkUser() {
  const response = await axios.get(`http://localhost:3000/user/info`, {
    headers: {
      username: localStorage.getItem('username'),
    },
  });
  showingAlert(
    document.getElementById('alert1'),
    response.status,
    response.data
  );
}

function showingAlert(object, status, message) {
  object.classList.remove(object.classList.item(1));
  if (status === 200) {
    object.classList.add('success');
    object.querySelector(
      'div'
    ).innerHTML = `<strong>Success!<strong> ${message}`;
  } else {
    object.querySelector(
      'div'
    ).innerHTML = `<strong>Error!<strong> ${status} ${message}`;
  }
  object.style.display = 'block';
  object.style.opacity = '1';
}

localStorage.setItem('username', '');

document.getElementById('post-button').addEventListener('click', createShorten);

async function createShorten() {
  const longURL = document.getElementById('url_input').value;
  const response = await axios.put(
    `http://localhost:3000/url/create`,
    { url: longURL },
    {
      headers: {
        username: localStorage.getItem('username'),
      },
    }
  );
  const shortenURL = response.data.newURL;
  document.getElementById(
    'short-url'
  ).value = `http://localhost:3000/${shortenURL}`;
}

document.getElementById('execCopy').addEventListener('click', copyFunction);

function copyFunction() {
  document.getElementById('short-url').select();
  document.execCommand('copy');
}

function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  let el = document.createElement(tagName);
  //Adding children
  for (const child of children) {
    el.append(child);
  }
  //Adding classes
  for (const cls of classes) {
    el.classList.add(cls);
  }
  //Adding attributes
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr]);
  }
  //Adding events
  for (const event in eventListeners) {
    el.addEventListener(event, eventListeners[event]);
  }
  return el;
}

document.getElementById('see-all').addEventListener('click', allMyShortens);

async function allMyShortens() {
  const response = await axios.get(`http://localhost:3000/user/all`, {
    headers: {
      username: localStorage.getItem('username'),
    },
  });
  const allURLs = response.data;
  generateList(allURLs);
}

function generateList(object) {
  for (const url in object) {
    const shortPart = createElement(
      'div',
      [`http://localhost:3000/${url}`],
      ['short-url'],
      {},
      {}
    );
    const longPart = createElement(
      'div',
      [`shorten url of '${object[url]}'`],
      ['long-url'],
      {},
      {}
    );
    const shorten = createElement('div', [shortPart, longPart], ['users-url']);

    document.getElementById('statistic').append(shorten);
  }
}

/*
document
  .getElementById('statistic-button')
  .addEventListener('click', statisticSection);

async function statisticSection(e) {
  const shortURL = e.target.inner;
  const response = await axios.get(`http://localhost:3000/url/statistic?`, {
    headers: {
      username: localStorage.getItem('username'),
    },
  });
}

function urlStatistic(obj) {
  document.getElementById('all-statistic').style.display = 'block';
  const header = createElement('h3');
  header.innerHTML = 'Statistic of URL Shorten';
  const shortURL = createElement('div');
  shortURL.innerHTML = `Short URL: 'localhost:3000/${obj.ShortURL}'`;
  const longURL = createElement('div');
  longURL.innerHTML = `Long URL: 'localhost:3000/${obj.LongURL}'`;
  const counter = createElement('div');
  counter.innerHTML = `Counter: ${obj.Counter}`;
  const creatingtime = createElement('div');
  creatingtime.innerHTML = `Was created: ${obj.CreatingTime}`;
  document
    .getElementById('statistic')
    .append(header, shortURL, longURL, counter, creatingtime);
}


*/
