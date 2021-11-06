import { statisticSection } from './shortens';

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

export function urlStatistic(obj) {
  const header = createElement('h3');
  header.innerHTML = 'Statistic of URL Shorten';
  const shortURL = createElement('div');
  shortURL.innerHTML = `<p>Short URL: <a href='https://secure-wildwood-48640.herokuapp.com/${obj.ShortURL}' target='_blank'> https://secure-wildwood-48640.herokuapp.com/${obj.ShortURL} <a><p>`;
  const longURL = createElement('div');
  longURL.innerHTML = `<p>Long URL: <a href='${obj.LongURL}' target='_blank'> ${obj.LongURL} <a><p>`;
  const counter = createElement('div');
  counter.innerHTML = `Counter: ${obj.Counter}`;
  const creatingtime = createElement('div');
  creatingtime.innerHTML = `Was created: ${obj.CreateTime}`;
  document
    .getElementById('statistic')
    .append(header, shortURL, longURL, counter, creatingtime);
}

export function generateList(object) {
  document.getElementById('statistic').innerHTML = '';
  for (const url in object) {
    const shortPart = createElement(
      'div',
      [`https://secure-wildwood-48640.herokuapp.com/${url}`],
      ['short-url'],
      {},
      { click: statisticSection }
    );

    const longPart = createElement('a', [], ['long-url'], {}, {});
    longPart.innerHTML = `${object[url]}`;
    longPart.href = object[url];
    longPart.target = '_blank';
    const shorten = createElement('div', [shortPart, longPart], ['users-url']);

    document.getElementById('statistic').append(shorten);
  }
}
