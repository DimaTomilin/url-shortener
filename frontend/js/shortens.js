import { showingAlert2 } from './alerts';
import { generateList, urlStatistic } from './elements';
import axios from 'axios';

document.getElementById('post-button').addEventListener('click', createShorten);
document.getElementById('see-all').addEventListener('click', allMyShortens);

async function createShorten() {
  try {
    const longURL = document.getElementById('url-input').value;
    const response = await axios.put(
      `https://secure-wildwood-48640.herokuapp.com/url/create`,
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
    ).value = `https://secure-wildwood-48640.herokuapp.com/${shortenURL}`;
  } catch {
    if (localStorage.getItem('username') === '') {
      showingAlert2('Please make sing in.');
    } else {
      showingAlert2('Server error please check all your shortens');
    }
  }
}

async function allMyShortens() {
  const response = await axios.get(
    `https://secure-wildwood-48640.herokuapp.com/user/all`,
    {
      headers: {
        username: localStorage.getItem('username'),
      },
    }
  );
  const allURLs = response.data;
  document.getElementById('url-shortener').style.display = 'none';
  document.getElementById('url-statistic').style.display = 'block';
  generateList(allURLs);
}

export async function statisticSection(e) {
  const shortURL = e.target.innerHTML;
  const index = shortURL.lastIndexOf('/') + 1;
  const response = await axios.get(
    `https://secure-wildwood-48640.herokuapp.com/url/statistic?url=${shortURL.slice(
      index
    )}`,
    {
      headers: {
        username: localStorage.getItem('username'),
      },
    }
  );
  document.getElementById('statistic').innerHTML = '';
  urlStatistic(response.data);
}
